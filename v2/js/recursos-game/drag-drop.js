// Variáveis globais para gerenciar o arraste (estado compartilhado)
let draggedWord = null;
let touchClone = null;
let currentExerciseScope = null; // Impede misturar exercícios

// Loop principal: Aplica a lógica para cada bloco de exercício
document.querySelectorAll('.exercise-content').forEach((exerciseWrapper) => {

    const wordsContainer = exerciseWrapper.querySelector('.words-container');
    const dropZones = exerciseWrapper.querySelectorAll('.drop-zone');
    const verifyBtn = exerciseWrapper.querySelector('.verify-btn');
    const resetBtn = exerciseWrapper.querySelector('.reset-btn');
    const scoreDisplay = exerciseWrapper.querySelector('.score');

    // Salva o HTML original para o Reset
    const originalWordsHTML = wordsContainer.innerHTML;

    // Cria um mapa id -> texto original para quando formos devolver palavras
    const originalMap = new Map();
    {
        const temp = document.createElement('div');
        temp.innerHTML = originalWordsHTML;
        temp.querySelectorAll('.word').forEach(w => {
            if (w.id) originalMap.set(w.id, w.textContent);
        });
    }

    // --- 1. FUNÇÃO DE EMBARALHAR ---
    function shuffleWords() {
        const wordsArray = Array.from(wordsContainer.querySelectorAll('.word'));
        for (let i = wordsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [wordsArray[i], wordsArray[j]] = [wordsArray[j], wordsArray[i]];
        }
        wordsArray.forEach(word => wordsContainer.appendChild(word));
    }

    // --- 2. FUNÇÃO: Devolve palavra ao banco (AGORA USA O TEXTO CORRETO) ---
    function returnExistingWord(id, text) {
        const returnedWord = document.createElement('div');
        returnedWord.className = 'word';
        if (id) returnedWord.id = id;
        // Prioriza o texto passado; se não houver, tenta o mapa original; se nada, usa o id
        const textToUse = text ?? (id ? originalMap.get(id) : null) ?? id ?? '';
        returnedWord.textContent = textToUse;
        returnedWord.setAttribute('draggable', 'true');
        wordsContainer.appendChild(returnedWord);
        addEvents(returnedWord);
    }

    // --- LÓGICA DE EVENTOS ---
    function addEvents(word) {
        // Desktop
        word.setAttribute('draggable', 'true');

        word.addEventListener('dragstart', () => {
            draggedWord = word;
            currentExerciseScope = exerciseWrapper;
            word.style.opacity = '0.6';
            word.style.transform = 'scale(1.1)';
        });

        word.addEventListener('dragend', () => {
            draggedWord = null;
            currentExerciseScope = null;
            word.style.opacity = '1';
            word.style.transform = 'scale(1)';
        });

        // Mobile
        word.addEventListener('touchstart', (e) => {
            touchClone = word.cloneNode(true);
            touchClone.classList.add('dragging-mobile');
            touchClone.style.position = 'fixed';
            touchClone.style.pointerEvents = 'none';
            touchClone.style.zIndex = '9999';
            document.body.appendChild(touchClone);
            currentExerciseScope = exerciseWrapper;
            moveClone(e.touches[0]);
        });

        word.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (touchClone) {
                moveClone(e.touches[0]);
                highlightDropZone(e.touches[0], exerciseWrapper);
            }
        });

        word.addEventListener('touchend', (e) => {
            if (touchClone) {
                const touch = e.changedTouches[0];
                const dropZone = document.elementFromPoint(touch.clientX, touch.clientY);

                if (dropZone &&
                    dropZone.classList.contains('drop-zone') &&
                    exerciseWrapper.contains(dropZone)) {

                    // A. Devolve palavra antiga (se houver), usando também o texto guardado
                    if (dropZone.dataset.filled) {
                        returnExistingWord(dropZone.dataset.filled, dropZone.dataset.filledText);
                    }

                    // B. Remove cores
                    dropZone.classList.remove('correct', 'incorrect');

                    // C. Coloca nova palavra (guarda id e texto)
                    dropZone.textContent = word.textContent;
                    if (word.id) dropZone.dataset.filled = word.id;
                    // guardamos também o texto para poder recriar corretamente
                    dropZone.dataset.filledText = word.textContent;

                    word.style.display = 'none';
                }

                if (touchClone.parentNode) document.body.removeChild(touchClone);
                touchClone = null;
                currentExerciseScope = null;
                clearHighlight(dropZones);
            }
        });
    }

    // Inicializa eventos e embaralha as palavras
    wordsContainer.querySelectorAll('.word').forEach(addEvents);
    shuffleWords();

    // Eventos Drop Zones (Desktop)
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', e => e.preventDefault());

        zone.addEventListener('drop', () => {
            if (draggedWord && currentExerciseScope === exerciseWrapper) {

                // A. Devolve palavra antiga (se houver), usando também o texto guardado
                if (zone.dataset.filled) {
                    returnExistingWord(zone.dataset.filled, zone.dataset.filledText);
                }

                // B. Remove cores
                zone.classList.remove('correct', 'incorrect');

                // C. Coloca nova palavra (guarda id e texto)
                zone.textContent = draggedWord.textContent;
                if (draggedWord.id) zone.dataset.filled = draggedWord.id;
                zone.dataset.filledText = draggedWord.textContent;

                draggedWord.style.display = 'none';
            }
        });
    });

    // Botão Verificar
    verifyBtn.addEventListener('click', () => {
        let correctCount = 0;
        let total = dropZones.length;

        dropZones.forEach(zone => {
            zone.classList.remove('correct', 'incorrect');

            if (zone.dataset.filled) {
                if (zone.dataset.filled === zone.dataset.answer) {
                    zone.classList.add('correct');
                    correctCount++;
                } else {
                    zone.classList.add('incorrect');
                    // Devolve palavra errada (passando o texto correto)
                    returnExistingWord(zone.dataset.filled, zone.dataset.filledText);
                    zone.textContent = '';
                    delete zone.dataset.filled;
                    delete zone.dataset.filledText;
                }
            }
        });

        scoreDisplay.innerHTML =
            `<strong>Pontuação:</strong> Você acertou <strong>${correctCount}</strong> de <strong>${total}</strong>.`;
    });

    // Botão Reiniciar
    resetBtn.addEventListener('click', () => {
        dropZones.forEach(zone => {
            zone.textContent = '';
            zone.classList.remove('correct', 'incorrect');
            delete zone.dataset.filled;
            delete zone.dataset.filledText;
        });

        wordsContainer.innerHTML = originalWordsHTML;
        // Recria o mapa original (caso precise) e reatribui eventos
        const temp = document.createElement('div');
        temp.innerHTML = originalWordsHTML;
        originalMap.clear();
        temp.querySelectorAll('.word').forEach(w => {
            if (w.id) originalMap.set(w.id, w.textContent);
        });

        wordsContainer.querySelectorAll('.word').forEach(addEvents);

        shuffleWords();
        scoreDisplay.textContent = '';
    });
});

// Funções Auxiliares Globais
function moveClone(touch) {
    if (touchClone) {
        touchClone.style.left = (touch.clientX - 30) + 'px';
        touchClone.style.top = (touch.clientY - 30) + 'px';
    }
}

function highlightDropZone(touch, contextScope) {
    document.querySelectorAll('.drop-zone').forEach(z => z.classList.remove('highlight'));
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.classList.contains('drop-zone') && contextScope.contains(element)) {
        element.classList.add('highlight');
    }
}

function clearHighlight(specificZones) {
    if (specificZones) {
        specificZones.forEach(zone => zone.classList.remove('highlight'));
    } else {
        document.querySelectorAll('.drop-zone').forEach(z => z.classList.remove('highlight'));
    }
}

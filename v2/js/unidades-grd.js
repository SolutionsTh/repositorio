// Função para obter a data e hora de Brasília da internet
async function fetchBrasiliaTime() {
    try {
        const response = await fetch('https://worldtimeapi.org/api/timezone/America/Sao_Paulo');
        const data = await response.json();
        return new Date(data.datetime);
    } catch (error) {
        console.error("Erro ao buscar a data e hora de Brasília:", error);
        return null;
    }
}

// Função para criar um objeto Date com base na string de data/hora
function parseDateToBrasilia(str) {
    const [day, month, year] = str.split(' ')[0].split('/').map(Number);
    const [hour, minute, second] = str.split(' ')[1].split(':').map(Number);
    return new Date(year, month - 1, day, hour, minute, second);
}

// Data e hora de liberação das unidades
const dtApresentacao = parseDateToBrasilia('01/01/2025 00:00:00');
const dtUnidade1 = parseDateToBrasilia('01/01/2025 00:00:00');
const dtUnidade2 = parseDateToBrasilia('24/02/2025 00:00:00');
const dtUnidade3 = parseDateToBrasilia('24/03/2025 00:00:00');
const dtUnidade4 = parseDateToBrasilia('21/04/2025 00:00:00');

// Link das unidades
var linkApresentacao = document.getElementById('link-apresentacao');
var linkUnidade1 = document.getElementById('link-unidade-1');
var linkUnidade2 = document.getElementById('link-unidade-2');
var linkUnidade3 = document.getElementById('link-unidade-3');
var linkUnidade4 = document.getElementById('link-unidade-4');

// Imagem das unidades
var imgApresentacao = document.getElementById('img-apresentacao');
var imgUnidade1 = document.getElementById('img-unidade-1');
var imgUnidade2 = document.getElementById('img-unidade-2');
var imgUnidade3 = document.getElementById('img-unidade-3');
var imgUnidade4 = document.getElementById('img-unidade-4');

// Função principal para verificar a exibição das divs
async function checkDivDisplay() {
    const currentDate = await fetchBrasiliaTime();

    if (currentDate) {
        // Apresentação
        // Checar se está na data da liberação do conteúdo
        if (currentDate < dtApresentacao) {
            linkApresentacao.classList.add('sem-conteudo'); // Colocar a class "sem-conteudo" caso não tenha e não esteja na data de liberação do conteúdo
        }
        // Checar se está sem a class "sem-conteudo" para disponibilizar o conteúdo
        if (linkApresentacao.classList.contains('sem-conteudo')) {
            linkApresentacao.href = ""; // Remover link do conteudo
            linkApresentacao.style.cursor = "default"; // Tirar cursos de clique
            imgApresentacao.src = "https://nead.unigranrio.edu.br/material/base/2025/v4.7/img/cont-apresentacao-desabilitada.png"; // Adicionar imagem desabilitada
            imgApresentacao.title = "Aguarde a disponibilidade do conteúdo da Apresentação da Disciplina"; // Adicionar aguarde a disponibilidade
        }

        // Unidade 1
        // Checar se está na data da liberação do conteúdo
        if (currentDate < dtUnidade1) {
            linkUnidade1.classList.add('sem-conteudo'); // Colocar a class "sem-conteudo" caso não tenha e não esteja na data de liberação do conteúdo
        }
        // Checar se está sem a class "sem-conteudo" para disponibilizar o conteúdo
        if (linkUnidade1.classList.contains('sem-conteudo')) {
            linkUnidade1.href = ""; // Remover link do conteudo
            linkUnidade1.style.cursor = "default"; // Tirar cursos de clique
            imgUnidade1.src = "https://nead.unigranrio.edu.br/material/base/2025/v4.7/img/cont-unidade-1-desabilitada.png"; // Adicionar imagem desabilitada
            imgUnidade1.title = "Aguarde a disponibilidade do conteúdo da Unidade 1"; // Adicionar aguarde a disponibilidade
        }

        // Unidade 2
        // Checar se está na data da liberação do conteúdo
        if (currentDate < dtUnidade2) {
            linkUnidade2.classList.add('sem-conteudo'); // Colocar a class "sem-conteudo" caso não tenha e não esteja na data de liberação do conteúdo
        }
        // Checar se está sem a class "sem-conteudo" para disponibilizar o conteúdo
        if (linkUnidade2.classList.contains('sem-conteudo')) {
            linkUnidade2.href = ""; // Remover link do conteudo
            linkUnidade2.style.cursor = "default"; // Tirar cursos de clique
            imgUnidade2.src = "https://nead.unigranrio.edu.br/material/base/2025/v4.7/img/cont-unidade-2-desabilitada.png"; // Adicionar imagem desabilitada
            imgUnidade2.title = "Aguarde a disponibilidade do conteúdo da Unidade 2"; // Adicionar aguarde a disponibilidade
        }

        // Unidade 3
        // Checar se está na data da liberação do conteúdo
        if (currentDate < dtUnidade3) {
            linkUnidade3.classList.add('sem-conteudo'); // Colocar a class "sem-conteudo" caso não tenha e não esteja na data de liberação do conteúdo
        }
        // Checar se está sem a class "sem-conteudo" para disponibilizar o conteúdo
        if (linkUnidade3.classList.contains('sem-conteudo')) {
            linkUnidade3.href = ""; // Remover link do conteudo
            linkUnidade3.style.cursor = "default"; // Tirar cursos de clique
            imgUnidade3.src = "https://nead.unigranrio.edu.br/material/base/2025/v4.7/img/cont-unidade-3-desabilitada.png"; // Adicionar imagem desabilitada
            imgUnidade3.title = "Aguarde a disponibilidade do conteúdo da Unidade 3"; // Adicionar aguarde a disponibilidade
        }
        
        // Unidade 4
        // Checar se está na data da liberação do conteúdo
        if (currentDate < dtUnidade4) {
            linkUnidade4.classList.add('sem-conteudo'); // Colocar a class "sem-conteudo" caso não tenha e não esteja na data de liberação do conteúdo
        }
        // Checar se está sem a class "sem-conteudo" para disponibilizar o conteúdo
        if (linkUnidade4.classList.contains('sem-conteudo')) {
            linkUnidade4.href = ""; // Remover link do conteudo
            linkUnidade4.style.cursor = "default"; // Tirar cursos de clique
            imgUnidade4.src = "https://nead.unigranrio.edu.br/material/base/2025/v4.7/img/cont-unidade-4-desabilitada.png"; // Adicionar imagem desabilitada
            imgUnidade4.title = "Aguarde a disponibilidade do conteúdo da Unidade 4"; // Adicionar aguarde a disponibilidade
        }
    }
}

// Chama a função para verificar a exibição das divs
checkDivDisplay();
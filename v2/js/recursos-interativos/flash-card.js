const cards = Array.from(document.querySelectorAll('.flash-card-content'));
const finalCard = cards[cards.length - 1]; // último é mensagem final
const questionCards = cards.slice(0, -1); // todos menos o último

let shuffled = [];
let currentIndex = 0;
let flipped = false;

function shuffle(array) {
  let arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function startRound() {
  shuffled = shuffle(questionCards);
  currentIndex = 0;
  showCard(shuffled[currentIndex]);
}

function showCard(card) {
  cards.forEach(c => {
    c.classList.remove('active', 'is-flashped');
  });

  card.classList.add('active');
  flipped = false;
}

function nextCard() {
  const currentCard = shuffled[currentIndex];

  currentCard.classList.add('is-exiting');

  setTimeout(() => {
    currentCard.classList.remove('is-exiting');
    currentIndex++;

    if (currentIndex >= shuffled.length) {
      showCard(finalCard);
    } else {
      showCard(shuffled[currentIndex]);
    }
  }, 500);
}

cards.forEach(card => {
  card.addEventListener('click', () => {

    // Se for mensagem final
    if (card === finalCard) {
      startRound();
      return;
    }

    if (!flipped) {
      card.classList.add('is-flashped');
      flipped = true;
    } else {
      nextCard();
    }
  });
});

startRound();
const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-btn');
let cardArray = [];
let flippedCards = [];
let matchedCards = [];

// The card values (could be anything you like)
const cardValues = ['🍎', '🍌', '🍓', '🍊', '🍉', '🍇', '🍒', '🍍'];

function generateCards() {
  // Create a new array with 2 copies of each card
  cardArray = [...cardValues, ...cardValues];
  // Shuffle the cards
  cardArray.sort(() => Math.random() - 0.5);

  // Render cards to the game board
  gameBoard.innerHTML = '';
  cardArray.forEach((value, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', index);
    card.setAttribute('data-value', value);
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard(event) {
  const clickedCard = event.target;

  // If card is already flipped or matched, return
  if (flippedCards.length === 2 || clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) {
    return;
  }

  clickedCard.classList.add('flipped');
  clickedCard.textContent = clickedCard.getAttribute('data-value');
  flippedCards.push(clickedCard);

  // Check if two cards are flipped
  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

function checkForMatch() {
  const [firstCard, secondCard] = flippedCards;

  if (firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value')) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedCards.push(firstCard, secondCard);
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard.textContent = '';
      secondCard.textContent = '';
    }, 1000);
  }

  // Reset flipped cards array
  flippedCards = [];

  // Check if the game is won
  if (matchedCards.length === cardArray.length) {
    setTimeout(() => alert('You win!'), 500);
  }
}

// Reset game
resetButton.addEventListener('click', () => {
  matchedCards = [];
  flippedCards = [];
  generateCards();
});

// Initialize the game
generateCards();

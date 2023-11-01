window.onload = function() {
  const transition = document.querySelector('.transition');
  setTimeout(() => {
    transition.classList.remove('is-active');
  }, 500);

}

"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "indianred", "cornflowerblue", "olivedrab", "lightsalmon", "plum",
  "indianred", "cornflowerblue", "olivedrab", "lightsalmon", "plum",
];


const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/* Create card for every color in colors (each will appear twice)

  Each div DOM element will have:
  - a class with the value of the color
  - a click event listener for each card to handleCardClick
 */


function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    // missing code here ...
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick)
    gameBoard.appendChild(newDiv);
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  card.style.backgroundColor = card.classList[0];
  card.classList.add("flipped");
}

/** Flip a card face-down. */

function unFlipCard(card) {
  card.style.backgroundColor = "";
  card.classList.remove("flipped");
}

/** Handle clicking on a card: this could be first-card or second-card. */
let lock = false
let cardCount = 0;
let flippedCards = [];
let numTries = 0;
let score = document.getElementById("score");
score.style.display = "inline"

function handleCardClick(e) {
  if(lock){
    return;
  }

  let card = e.target;

  if(!card.classList.contains("flipped") && flippedCards.length <= 2){
    flipCard(card);
    flippedCards.push(card);
  }

  if(flippedCards.length === 2){
    lock = true;
    numTries++;
    score.innerText = numTries;

    if(flippedCards[0].style.backgroundColor === flippedCards[1].style.backgroundColor){
      flippedCards[0].removeEventListener("click", handleCardClick);
      flippedCards[1].removeEventListener("click", handleCardClick);
      flippedCards = [];
      lock = false;
      cardCount += 2;
    } else {
      setTimeout(function (){
        unFlipCard(flippedCards[0]);
        unFlipCard(flippedCards[1]);
        flippedCards = [];
        lock = false;
      }, FOUND_MATCH_WAIT_MSECS);
    }
  }

  if(cardCount === COLORS.length){
    setTimeout(function(){
      alert("You found them all in " + numTries + " tries!")
    }, 300)
  }
}





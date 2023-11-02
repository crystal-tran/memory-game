
//function is called when the window loads to create a smooth transition
//querySelector searches for the first element with the class of transition
//removes the 'is-active' class from that element after a 500ms delay
//makes the overlay invisible

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

  //function to create memory cards with the shuffled color array as a parameter
function createCards(colors) {
  //retrieves the 'game' element by its ID, this will be the container of the memory card
  const gameBoard = document.getElementById("game");

  // iterates over each color in the array
  for (let color of colors) {
    // missing code here ...

    //creates a new div element, which will be the card
    const newDiv = document.createElement("div");

    //adds a color class to the div element
    newDiv.classList.add(color);

    //a click event listener is added to the card and it calls back the function handleCardClick
    newDiv.addEventListener("click", handleCardClick)

    //appends the newly created card to the gameBoard container
    gameBoard.appendChild(newDiv);
  }
}

/** Flip a card face-up. */
//function sets the background color of the flipped card based on its class
//and adds the class of flipped
function flipCard(card) {
  card.style.backgroundColor = card.classList[0];
  card.classList.add("flipped");
}

/** Flip a card face-down. */
//function resets the background color and removes the class of flipped
function unFlipCard(card) {
  card.style.backgroundColor = "";
  card.classList.remove("flipped");
}

//variable to control whether clicking is enabled
let disableClick = false
//variable to keep track of the number of flipped cards
let cardCount = 0;
//an array to store the two flipped cards
let flippedCards = [];
//variable to keep track of score
let numTries = 0;
let score = document.getElementById("score");
score.style.display = "inline"

/* Handle clicking on a card: this could be first-card or second-card. */
function handleCardClick(e) {
  //checks if clicking on cards is disabled, if true then function does not proceed
  if(disableClick){
    return;
  }


  let card = e.target;

  //if the card does not contain the class of "flipped" and there are <= 2 flipped cards
  //call the function flipCard
  //push that card into flippedCards array
  if(!card.classList.contains("flipped") && flippedCards.length <= 2){
    flipCard(card);
    flippedCards.push(card);
  }

  //if two cards are flipped, increase score count and disable clicking
  if(flippedCards.length === 2){
    disableClick = true;
    numTries++;
    score.innerText = numTries;

    //if the flipped cards match in color, remove the click event listener and increase cardCount
    //clear out flippedCards array and enable clicking
    if(flippedCards[0].style.backgroundColor === flippedCards[1].style.backgroundColor){
      flippedCards[0].removeEventListener("click", handleCardClick);
      flippedCards[1].removeEventListener("click", handleCardClick);
      flippedCards = [];
      disableClick = false;
      cardCount += 2;
    } else {

      //if the flipped cards did not match, call the function unFlipCard after 1000ms
      //clear out the flippedCards array and enable clicking
      setTimeout(function (){
        unFlipCard(flippedCards[0]);
        unFlipCard(flippedCards[1]);
        flippedCards = [];
        disableClick = false;
      }, FOUND_MATCH_WAIT_MSECS);
    }
  }

  //if all cards have been matched, alert the user their score
  if(cardCount === COLORS.length){
    setTimeout(function(){
      alert("You found them all in " + numTries + " tries!")
    }, 300)
  }
}





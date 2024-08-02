const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let flippedCards = 0;
let noClicks = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  //dont run function if we can't click
  if (noClicks) 
    return;
  //if we are clicking on a flipped card, do not continue function
  if (event.target.classList.contains("flipped")) return;

  //change card color
  let currCard = event.target;
  currCard.style.backgroundColor = currCard.classList[0];

  //if either card is null
  if (!card1 || !card2) {
    //mark it as flipped
    currCard.classList.add("flipped");
    //card1 is the current card
    card1 = card1 || currCard;
    //if card1 is not null, currCard is card2
    card2 = currCard == card1 ? null : currCard;
  }
  
  //when both cards are actiive
  if (card1 && card2) {
    //we can no longer click
    noClicks = true;
    
    //compare the cards
    if (card1.className === card2.className) {
      //if cards are equal, remove them from being clicked and set to null
      flippedCards += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicks = false;
    } else {
      //if cards are not equal, flip back over
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicks = false;
      }, 1000);
    }
  }

  if (flippedCards === COLORS.length) alert("You Win!");
}

//when the DOM loads
createDivsForColors(shuffledColors);
const overlay = document.getElementById('overlay');
const overlayTitle = overlay.querySelector('.title');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');

const scoreboard = document.getElementById('scoreboard');
const scoreBoardOl = scoreboard.getElementsByTagName("OL")[0];

const btnReset = overlay.querySelector('.btn__reset');
const phraseUl = phrase.getElementsByTagName("UL")[0];
let thePhrase = '';


let missed = 0;
let phrases = [
  'Accidents will happen',
  'All fingers and thumbs',
  'As bald as a coot',
  'As mad as a hatter',
  'Away with the fairies',
  'Beat around the bush',
  'Bells and whistles',
  'Blaze a trail',
  'Cast the first stone',
  'Cool as a cucumber',
  'Eat humble pie',
  'Head over heels',
  'Play silly buggers',
  'Shrinking violet',
  'Start from scratch',
]

//hide overlay when clicked start game
btnReset.addEventListener('click', (e) => {
  overlay.style.display = "none";
})

//Get random phrase from array phrases and split characters into array
function getRandomPhraseAsArray(arr){
  let randomItem = arr[Math.floor(Math.random()*arr.length)];
  //put random phrase in variable for use on win/lose screens
  thePhrase = randomItem;
  //return phrase split in array
  return randomItem.split('');
}

phraseArray = getRandomPhraseAsArray(phrases);

function addPhraseToDisplay(arr){
  for (i = 0; i < phraseArray.length; i++) {
    li = document.createElement("li");
    if(phraseArray[i] === ' '){
      li.classList.add("space");
    }else{
      li.classList.add("letter");
    }
    li.textContent = phraseArray[i];
    phraseUl.appendChild(li);
  }
}

addPhraseToDisplay(phraseArray);

function checkLetter(button){
  let letters = document.querySelectorAll('.letter');
  match = null;  //set initial value
  for (i = 0; i < letters.length; i++) {
    letter = letters[i].textContent.toLowerCase();
    if(letter === button){
      letters[i].classList.add("show");
      match = letter; //update value in loop if matches
    }
  }
  return match; //return updated value. Return within a loop breaks a loop
}

//check for shorthand way to create funtions

qwerty.addEventListener('click', (e) => {
  if(e.target.tagName === 'BUTTON'){
    button = e.target;
    button.classList.add('chosen');
    button.setAttribute('disabled','true');
    button = button.textContent.toLowerCase();
    letterFound = checkLetter(button);

    //alert(letterFound);
    if(letterFound == null){
      //add one to the missed variable
        missed++;
        //need to remove a try here. Get the last child tries of scoreBoardOl and remove it
         tries = scoreBoardOl.querySelector('.tries:last-child');
         tries.parentNode.removeChild(tries);
    }

    checkWin();

  }
})



//Create a checkWin function

function checkWin(){
  //get count of letters with class 'show'
  let letterShow = phraseUl.querySelectorAll('.show');
  let showCount = letterShow.length;

  //get count of letters with class 'letters'
  let letterLetter = phraseUl.querySelectorAll('.letter');
  let letterCount = letterLetter.length;

  //alert(letterCount);

  if(showCount === letterCount){
    overlay.classList.add("win");
    overlay.style.display = "flex";
    overlayTitle.innerHTML = `You Win!<br> The phrase was:<br>${thePhrase}`;
  }

  if(missed >= 5){
    overlay.classList.add("lose");
    overlay.style.display = "flex";
    overlayTitle.innerHTML = `You Lose!<br> The phrase was:<br>${thePhrase}`;
  }
  //If they’re equal, show the overlay screen with the “win” class and appropriate text. Otherwise, if the number of misses is equal to or greater than 5, show the overlay screen with the “lose” class and appropriate text.
}


function resetGame(){

}

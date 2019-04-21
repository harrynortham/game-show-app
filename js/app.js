const overlay = document.getElementById('overlay');
const overlayTitle = overlay.querySelector('.title');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');

const scoreboard = document.getElementById('scoreboard');
const scoreBoardOl = scoreboard.getElementsByTagName("OL")[0];
let tries = scoreBoardOl.querySelectorAll('.tries');
const triesTotal = 5;

const btnReset = overlay.querySelector('.btn__reset');
const phraseUl = phrase.getElementsByTagName("UL")[0];
let thePhrase = '';


let missed = 0;
let phrases = [
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
  'Start from scratch'
]

//hide overlay when clicked to start a game
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

  let letters = phraseUl.querySelectorAll('.letter');

  match = null;  //set initial value of match
  for (i = 0; i < letters.length; i++) {
    letter = letters[i].textContent.toLowerCase();
    if(letter === button){
      letters[i].classList.add("show");
      match = letter; //update value of match in loop if letter matches
    }
  }
  return match; //return updated value. Note: a return within a loop breaks a loop which is why this is outside
}

//check for shorthand way to create funtions

qwerty.addEventListener('click', (e) => {
  if(e.target.tagName === 'BUTTON'){
    button = e.target;
    button.classList.add('chosen');
    button.setAttribute('disabled','true');
    button = button.textContent.toLowerCase();
    letterFound = checkLetter(button);

    if(letterFound == null){

      //need to remove a try here. Use the value of missed as an index for each heart
        tries[missed].style.display = 'none';

        //add one to the missed variable
          missed++;
    }

    checkWin(); //run checkWin function

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

  if(showCount === letterCount){
    setTimeout(function(){  //set time out so last letter is shown before overlay
      overlay.className = "win";
      overlay.style.display = "flex";
      overlayTitle.innerHTML = `You Win!<br> The phrase was:<br>${thePhrase}`;
      resetGame();
    }, 800);
  }

  if(missed >= triesTotal){
    setTimeout(function(){ //set time out so last letter is shown before overlay
      overlay.className = "lose";
      overlay.style.display = "flex";
      overlayTitle.innerHTML = `You Lose!<br> The phrase was:<br>${thePhrase}`;
      resetGame();
    }, 800);
  }

//Create a function to house both if statements, be more DRY

}


function resetGame(){

  btnReset.textContent = 'Play Again';

  //set missed variable back to 0
  missed = 0;

  phraseUl.querySelectorAll('li').forEach(el =>
    el.remove()
  ); //remove each list item from the nodelist

  phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);

  //get nodelist of buttons and loop through
  const button = qwerty.getElementsByTagName('button');
  for (let i = 0; i < button.length; i++) {
      button[i].className = '';
      button[i].disabled = false;
  }

  //reset tries, put the hearts back
  for (let i = 0; i < tries.length; i++) {
    tries[i].style.display = 'inline-block';
  }

}

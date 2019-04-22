const overlay = document.getElementById('overlay');
const overlayTitle = overlay.querySelector('.title');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const scoreboard = document.getElementById('scoreboard');
const scoreBoardOl = scoreboard.getElementsByTagName("OL")[0];
const tries = scoreBoardOl.querySelectorAll('.tries');
const triesTotal = 5;
const btnReset = overlay.querySelector('.btn__reset');
const phraseUl = phrase.getElementsByTagName("UL")[0];
const phrases = [
  'As bald as a coot',
  'As mad as a hatter',
  'Blaze a trail',
  'Cool as a cucumber',
  'Eat humble pie',
  'Head over heels',
  'Play silly buggers',
  'Start from scratch'
]
let thePhrase = '';
let missed = 0;

const getRandomPhraseAsArray = arr => {
  let randomItem = arr[Math.floor(Math.random() * arr.length)];
  // **optional** I put my random phrase in variable for use on the win/lose screens
  thePhrase = randomItem;

  return randomItem.split(''); //return phrase split in array
}

phraseArray = getRandomPhraseAsArray(phrases);

const addPhraseToDisplay = arr => {
  for (i = 0; i < phraseArray.length; i++) {
    li = document.createElement("li");
    if (phraseArray[i] === ' ') {
      li.classList.add("space");
    } else {
      li.classList.add("letter");
    }
    li.textContent = phraseArray[i];
    phraseUl.appendChild(li);
  }
}

addPhraseToDisplay(phraseArray);

const checkLetter = button => {

  const letters = phraseUl.querySelectorAll('.letter');

  match = null; //set initial value of match
  for (let i = 0; i < letters.length; i++) {
    letter = letters[i].textContent.toLowerCase();
    if (letter === button) {
      letters[i].classList.add("show");
      match = letter; //update value of match in loop if letter matches
    }
  }
  return match; //return updated value.
  //Note: a return within a loop breaks a loop which is why this is outside
}

const checkWin = () => {

  const letterShow = phraseUl.querySelectorAll('.show');
  const showCount = letterShow.length; //get count of letters with class 'show'

  const letterLetter = phraseUl.querySelectorAll('.letter');
  const letterCount = letterLetter.length;   //get count of letters with class 'letters'

  if (showCount === letterCount) {
    setTimeout(function() { //set time out so last letter is shown before overlay
      overlay.className = "win";
      overlay.style.display = "flex";
      overlayTitle.innerHTML = `You Win!<br> The phrase was:<br>${thePhrase}`;
      resetGame();
    }, 800);
  }

  if (missed >= triesTotal) {
    setTimeout(function() { //set time out so last letter is shown before overlay
      overlay.className = "lose";
      overlay.style.display = "flex";
      overlayTitle.innerHTML = `You Lose!<br> The phrase was:<br>${thePhrase}`;
      resetGame();
    }, 800);
  }

}

const resetGame = () => {
  btnReset.textContent = 'Play Again'; //set missed variable back to 0
  missed = 0; //set missed variable back to 0

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

  for (let i = 0; i < tries.length; i++) { //reset tries, put the hearts back
    tries[i].getElementsByTagName("IMG")[0].src = 'images/liveHeart.png';
  }

}

qwerty.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    button = e.target;
    button.classList.add('chosen');
    button.setAttribute('disabled', 'true');
    button = button.textContent.toLowerCase();
    letterFound = checkLetter(button);

    if (letterFound == null) {
      //need to remove a try here. Use the value of missed as an index for each heart
      //tries[missed].style.display = 'none';

      tries[missed].getElementsByTagName("IMG")[0].src = 'images/lostHeart.png';

      missed++;   //add one to the missed variable
    }

    checkWin(); //run checkWin function
  }
})

btnReset.addEventListener('click', (e) => {
  overlay.style.display = "none";
})

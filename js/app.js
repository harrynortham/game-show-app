const overlay = document.getElementById('overlay');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const btnReset = overlay.querySelector('.btn__reset');
const ul = phrase.getElementsByTagName("UL")[0];

let missed = 0;
let phrases = [
  'A diamond in the rough',
  'A knight in shining armour',
  'A stitch in time saves nine',
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
  'Fall off the back of a lorry',
  'Good things come to those that wait',
  'Head over heels',
  'Innocent until proven guilty',
  'Know which side your bread is buttered',
  'Make hay while the sun shines',
  'Play silly buggers',
  'Read between the lines',
  'Shrinking violet',
  'Start from scratch',
  'The moving finger writes'
]

//hide overlay when clicked start game
btnReset.addEventListener('click', (e) => {
  overlay.style.display = "none";
})

//Get random phrase from array phrases and split characters into array
function getRandomPhraseAsArray(arr){
  let randomItem = arr[Math.floor(Math.random()*arr.length)];
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
    ul.appendChild(li);
  }
}

addPhraseToDisplay(phraseArray);

function checkLetter(button){
  let letters = document.querySelectorAll('.letter');
  for (i = 0; i < letters.length; i++) {
    letter = letters[i].textContent;
    letter = letter.toUpperCase();
    button = button.toUpperCase();

    if(letter === button){
      console.log('we have a match');
      letters[i].classList.add("show");
    }

  }
}

qwerty.addEventListener('click', (e) => {
  if(e.target.tagName === 'BUTTON'){
    button = e.target;
    buttonValue = button.textContent
    button.classList.add('chosen');
    button.setAttribute('disabled','true');
    checkLetter(buttonValue);
  }
})

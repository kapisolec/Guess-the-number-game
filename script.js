'use strict';
// cmd `live-server` => opens nodejs live server
//querySelector() wybiera nam daną klasę/id CSS
//a .textContent zwraca nam wartosc tekstową wpisaną w html klasie
//.value zwraca nam wartość wpisaną w input
let score = 20
let highScore = 0 
document.querySelector('.score').textContent = score;
let randNum = getRandomInt(1, 20);

//functions
const displayScore = function(score){
    document.querySelector('.score').textContent = score;
}
const displayMessage = function(message){
    document.querySelector('.message').textContent = message;
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

const ifGuessTooHigh = function(guess, randNum){
    if(guess-randNum > 5){document.querySelector('body').style.backgroundColor = 'darkblue';}
    else if(guess-randNum <= 5 && guess-randNum >= 2){document.querySelector('body').style.backgroundColor = '#00ada1';}
    else if(guess-randNum < 2 && guess-randNum >= 1){document.querySelector('body').style.backgroundColor = '#00ad62';}
}

const ifGuessTooLow = function(guess, randNum){
    if(randNum - guess > 5){document.querySelector('body').style.backgroundColor = 'darkred';}
    else if(randNum - guess <= 5 && randNum - guess >= 2){document.querySelector('body').style.backgroundColor = '#c27400';}
    else if(randNum - guess < 2 && randNum - guess >= 1){document.querySelector('body').style.backgroundColor = '#829900';}   
}


//reload score
document.querySelector('.again').addEventListener('click', function(){
    score = 20;
    randNum = getRandomInt(1, 20);
    document.querySelector('body').style.backgroundColor = '#222';
    displayMessage('Start guessing...');
    document.querySelector('.guess').value = '';
    document.querySelector('.number').textContent = '?';
    displayScore(score);
})
//game logic
document.querySelector('.check').addEventListener('click', function(){
    let guess = Number(document.querySelector('.guess').value)
    // no input or input == 0
    if(!guess){
        document.querySelector('body').style.backgroundColor = '#222';
        displayMessage('And what? Write a number!');
        document.querySelector('.guess').value = '';
        document.querySelector('.number').textContent = '?';
    }
    // player wins game
    else if(guess === randNum){
        displayMessage('Good guess, +3 points')
        score += 3  ;
        document.querySelector('body').style.backgroundColor = '#03ad00';
        if(score > highScore){
            highScore = score;
        }
        displayScore(score);
        document.querySelector('.guess').value = '';
        document.querySelector('.highscore').textContent = highScore;
        document.querySelector('.number').textContent = randNum;
        randNum = getRandomInt(1, 20);
        console.log(randNum);
    }
    // too high/too low guess
    else if(guess !== randNum){
        //too high
        if (guess > randNum){
            displayMessage('Wtf man, too high. Try again.');
            ifGuessTooHigh(guess, randNum);
        }
        //too low
        else if (guess < randNum){
            displayMessage('Wtf man, too low. Try again.');
            ifGuessTooLow(guess,randNum);
        }
        score -= 1;
        document.querySelector('.guess').value = '';
        document.querySelector('.number').textContent = '?'
        displayScore(score);
    }
});


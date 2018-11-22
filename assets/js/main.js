/* **********************************************************************************
 * Main Program
 * main is the "view controller" that interacts with web page which is the view
 * WordGuess stores the game info, words, and progress (the "model") and contains the logic
 * to run the game - like amn app controller.
 * NOTE:  I have this all done in one class per the instructions, but it really should
 * be divided into a few.  WordGuess would be the overall game running mutiple
 * times and storing the list of word choices.
 * Another class "word" we be the logic and data for a guess.  WordGuess
 * would create 1..n "word" objects for each time they tried.
 ********************************************************************************** */

 // Note, add these to the class later
var audioStart = new Audio("./assets/sounds/Pacman_Introduction_Music-KP.mp3"); // Audio to start the game
var audioWinner = new Audio("./assets/sounds/Strong_Punch-Mike_Koenig.mp3"); // Audio if you got it correct
var audioLoser = new Audio("./assets/sounds/Buzzer-SoundBible.com.mp3"); // Audio if you got it wrong

// Create wordGuess game object to run the game
var wordGuess = new WordGuess(5);
// displayGameStatus();

// Get the keyboard input - whenever a key is press
// I use *spacebar* to strat the game so the user does not accidentally start it
document.addEventListener('keyup', function (event) {
  
  // Get user input guesses if the game is in progress, otherwise
  // wait for the spacebar key to start the game
  if (wordGuess.gameInProgress) {
    // Get the character pressed
    var charValue = String.fromCharCode(event.keyCode);

    // Make sure the character is a valid letter and if it is not, just igore it and move on
    // Only accept keycodes for 'a' (65) through 'z' (90) and '0' (48) through '9' (57)
    if (((event.keyCode >= 65) && (event.keyCode <= 90)) || ((event.keyCode >= 48) && (event.keyCode <= 57))) {
      wordGuess.makeAGuess(charValue);
      displayGameStatus();

      // if you are done and got it right, end the game successfully
      // if you dont have it right and have no more guesses, end game unsuccessfully
      // Otherwise just give them another guess
      if (wordGuess.guessedCorrectly) {
        endGame(true);
      } else if (wordGuess.incorrectGuessesLeft < 1) {
        endGame(false);
      }
    } // if keycodes 'a' - 'z'

  } // if game in progress
  else { 
    // wait for spacebar
    if (event.keyCode == 32) {
      wordGuess.reset(5);   // reset all word stuff and start the game
      displayGameStatus();
      audioStart.play();
    }
  } // else 

});

// End the current game
function endGame(winner) {
  // Winner or loser messages and audio
  if (winner) {
    str = "You WON! Word is: " + wordGuess.wordToGuess + " - Press Spacebar to restart";
    audioWinner.play();
  } else {
    str ="Game Over, word is: " + wordGuess.wordToGuess + " - you lost, Press Spacebar to restart";
    audioLoser.play();
  }
  // Display Message
  document.getElementById("gameMessage").innerHTML = str;

}

function displayGameStatus() {
  document.getElementById("currentGuess").innerHTML = wordGuess.currentGuess;
  document.getElementById("incorrectGuessesLeft").innerHTML = wordGuess.incorrectGuessesLeft;
  document.getElementById("lettersGuessed").innerHTML = wordGuess.lettersGuessed;
  document.getElementById("lettersCorrectlyGuessed").innerHTML = wordGuess.lettersCorrectlyGuessed;
  document.getElementById("lettersIncorrectlyGuessed").innerHTML = wordGuess.lettersIncorrectlyGuessed;
  if (wordGuess.gameInProgress) {
    document.getElementById("gameMessage").innerHTML = "playing ...";
    document.getElementById("mainTitle").innerHTML = "Press letter or number key to guess";
  } else {
    document.getElementById("mainTitle").innerHTML = "Press spacebar to start";  
  }
  document.getElementById("nbrWins").innerHTML = "Number of Wins: " + wordGuess.nbrWins;
}
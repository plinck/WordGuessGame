# JavaScript Assignment

### Overview

#### Guess the name of an 80s New Wave band that I liked

To use, you first go to the website hosting this game:
* [Word Guess Game](https://plinck.github.io/WordGuessGame/)

Then, you press the `spacebar` key to start the game.

During game play, you just guess letters or numbers to guess the name of the band.  You get a certain number of __incorrect__ guesses.  If you guess a letter or number and you have already guessed that letter or number, you dont lose a guess.  If you guess a letter that is in the word/band name, you also dont lose a guess.

The game ends when you run out of __incorrect__ guesses or you guess the band name correctly.  Each time you get it correctly, I give you a win and tally the number of wins to show you.  After a single word guess is completed, you must hit the `spacebar` key again to start a new guess.

- - -

In this assignment, I created a Word Guess game that is like hangman.  The theme is new wave bands I liked from the 80's.  I created a class "WordGuessGame" that is like the view controller and has all logic for the overall game - wins, all words/images, progress and interacting with html to disoplay.  The wordGuess object has all the guts of guessing a single word.  The main class WordGuessGame uses wordGuess to handle the workload of
making guesses for one word.

The game randomly selects a band name from my `static` array and gives the user a number of tries to get it right.  I do not count guesses that are duplicates and I do not count guesses that are correct.  I allow the user so many incorrect guess before game is over.  The class defaults to '5' imncorrect guess, but you can create the WordGuessGame object with as many guesses as you like by passing it a number.

If the users gets the word right, I show the cover art for that band. The list of images is also a `static` array on the WordGuessGame object. If they run out of guesses without getting it right, I dont change the image so they can see the last one that was right.

I have some sound in it for now, but audio automatically palying on webpages is annoying so I dont plan to do background music.

This app runs in the browser, and feature dynamically updated HTML and CSS powered by JavaScript code.

### I linked from my responsive portffolio and my bootstrap portfolio sites

I added a portfolio item to both my responsive and bootstrap portfolio.  Both of those have a portfolio item that links to this game.  Just click on the image to open up the game.  You can link to either of them by clikcing the links below:
* [Responsvive Portfolio](https://plinck.github.io/Responsive-Portfolio/portfolio.html)
* [Bootstrap Portfolio](https://plinck.github.io/Bootstrap-Portfolio/portfolio.html)

- - -

### Bugs and known issues

* Refactor the code and objects.  I still need to refactor the main classes.  Right now, WordGuessGame class supports all the functionality of the game and the game.js main program runs it and interacts with the html.  I plan to refactor it to push the dynamic HTML into the WordGuessGame class and move the word guess logic for one specific guess into a class/object called word or wordGuess.  This makes most sense - word should encapuslate all the behavior of one single word guess and WordGuessGame should use that be the controller for the overall game with multiple guess.

- - -
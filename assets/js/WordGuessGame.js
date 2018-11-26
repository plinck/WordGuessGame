/* **********************************************************************************
 * Class: WordGuessGame
 * Contains all the functionality to do a hangman-type game
 * Note the use of Capitalizing first letter of each word in a class name
 * in a standard practice in most OO languages like C#, C++, Swift,
 * Java, objective-C etc.
 ********************************************************************************** */
/*
 * The arrays below are "static" members of this class, but there is no built-in way
 * to define static properties in Javascript.  The way to get the desired behavior - i.e.
 * these arrays are the same for all instances the objects -- aka class level -- is to 
 * deifine them outside the class and refer to tem with static methods in the class
 */
let _wordArray = [];
let _imageArray = [];

class WordGuessGame {
    // Give default number of missed guesses to 5
    constructor(guesses = 5) {
        //These are for the overall game no matter how many times you play
        this.nbrWins = 0;
        this.nextWordIndex = 0;
        this.createWordArray();
        this.createImageArray();
        this.gameInProgress = false; // true if playing game, false if ended
    }

    // *static* properties
    // This allows access to the *static* property arrays so one for ALL instances
    static get wordArray() {
        return _wordArray;
    }
    static get imageArray() {
        return _imageArray;
    }

    // Creates an array of word choices
    // To Do: For words with spaces or special characters, fill in those parts of the word
    // when you start the guessing game so the only pick letters but get hints
    // e.g. "The B-52's" wiuld show "_ _ _ _ - 5 2 ' _"
    createWordArray() {
        this.wordArray = ["DuranDuran", "TheCure", "INXS", "Queen", "Devo", "Yaz", "TheSmiths",
            "NewOrder", "REM", "TheHumanLeague", "DepecheMode", "TearsForFears",
            "TheCure", "TheCars", "TalkingHeads", "TheClash", "PeterGabriel",
            "TheB52s"
        ];
    }

    createImageArray() {
        this.imageArray = [
            "./assets/images/new-wave-bands-duran-duran.jpg",
            "./assets/images/new-wave-bands-the-cure.jpg",
            "./assets/images/new-wave-bands-inxs.jpg",
            "./assets/images/275x200Queen.png",
            "./assets/images/new-wave-bands-devo.jpg",
            "./assets/images/new-wave-bands-yaz.jpg",
            "./assets/images/new-wave-bands-the-smiths.jpg",
            "./assets/images/new-wave-bands-new-order.jpg",
            "./assets/images/new-wave-bands-rem.jpg",
            "./assets/images/new-wave-bands-human-league.jpg",
            "./assets/images/new-wave-bands-depeche-mode.jpg",
            "./assets/images/new-wave-bands-tears-for-fears.jpg",
            "./assets/images/new-wave-bands-the-cure.jpg",
            "./assets/images/275x200TheCars.png",
            "./assets/images/275x200TheTalkingHeads.png",
            "./assets/images/275x200TheClash.png",
            "./assets/images/275x200PeterGabriel.png",
            "./assets/images/275x200B52s.png"
        ];
    }

    // These change every time the game restarts - the is really a word object
    // during rafctoring, I will use this method to create a new instance of word
    // which will be the actaul guess for just one word
    reset(guesses) {
        this.gameInProgress = true; // true if playing game, false if ended

        // get a random word from the database/array of words
        this.nextWordIndex = Math.floor(Math.random() * this.wordArray.length);

        this.wordToGuess = this.wordArray[this.nextWordIndex];
        this.wordImage = this.imageArray[this.nextWordIndex];
        this.currentGuess = "";
        this.lettersGuessed = "";
        this.incorrectGuessesLeft = guesses;
        this.lettersCorrectlyGuessed = "";
        this.nbrLettersGuessedCorrect = 0;
        this.lettersIncorrectlyGuessed = "";
        this.nbrLettersGuessedIncorrect = 0;
        this.guessedCorrectly = false;

        this.makeBlankGuess(this.wordToGuess);
    }

    // Make the blank layout of the word
    makeBlankGuess(word) {
        var text = "";
        for (var member in word) {
            // text += "list[member]";
            text += "_";
        }
        this.currentGuess = text;
    }

    // put the letter in the correct spot
    updateCurrentGuess(indicesFound, replacement) {
        var newGuess = this.currentGuess;
        var currGuess = this.currentGuess;

        // Get all the matches in case same letter multiple times
        for (var i = 0; i < indicesFound.length; i++) {
            newGuess =
                currGuess.substr(0, indicesFound[i]) +
                replacement +
                currGuess.substr(indicesFound[i] + replacement.length);
            currGuess = newGuess;
        }

        this.currentGuess = newGuess;
        console.log("newGuess:'" + newGuess + "'");

        if (this.currentGuess == this.wordToGuess.toLowerCase()) {
            this.guessedCorrectly = true;
            this.nbrWins += 1; // Add one to number of games won
            this.gameInProgress = false; // end game, win
        }
    }

    makeAGuess(letter) {
        var lowerLetter = letter.toLowerCase();
        var lowerWord = this.wordToGuess.toLowerCase();

        // var n = lowerWord.search(lowerLetter);

        var indicesFound = [];
        var nbrFound = 0;
        for (var i = 0; i < lowerWord.length; i++) {
            if (lowerWord[i] == lowerLetter) {
                nbrFound += 1;
                indicesFound.push(i);
            }
        }

        // Add to the letters guessed string if they didnt aleady guess it
        // If they already guessed this letter, give them a pass and another try
        // If they guess correctly, do NOT count that against them
        if (this.lettersGuessed.search(lowerLetter) < 0) {
            this.lettersGuessed += lowerLetter;

            if (nbrFound > 0) {
                // add to letters correctly guessed
                this.lettersCorrectlyGuessed += lowerLetter;
                this.nbrLettersGuessedCorrect += 1;

                this.updateCurrentGuess(indicesFound, lowerLetter);
            } else {
                // Take away one of the guesses and add to letters Incorrectly guessed 
                this.incorrectGuessesLeft -= 1;
                this.lettersIncorrectlyGuessed += lowerLetter;
                this.nbrLettersGuessedIncorrect += 1;
            }

            // end the game if no more guesses
            if (this.incorrectGuessesLeft < 1) {
                this.gameInProgress = false; // end game, loss
            }

        } else {
            console.log("Already guessed the letter: " + lowerLetter);
        }
    }

    // Print self/this
    print() {
        // WordGuessGame properties
        document.write("wins:" + this.nbrWins + "<br>");
        document.write("nextWordIndex" + this.nextWordIndex + "<br>");
        // wordArray();
        // imageArray();

        // "word" properties - i.e. properties for one word guess - refactor to object
        document.write("gameInProgress:'" + this.gameInProgress + "'" + "<br>");
        document.write("wordToGuess:'" + this.wordToGuess + "'" + "<br>");
        document.write("wordImage:'" + this.wordImage + "'" + "<br>");
        document.write("currentGuess:'" + this.currentGuess + "'" + "<br>");
        document.write("lettersGuessed:'" + this.lettersGuessed + "'" + "<br>");
        document.write("incorrectGuessesLeft:" + this.incorrectGuessesLeft + "<br>");
        document.write("lettersCorrectlyGuessed:'" + this.lettersCorrectlyGuessed + "'" + "<br>");
        document.write("nbrLettersGuessedCorrect:" + this.nbrLettersGuessedCorrect + "<br>");
        document.write("lettersIncorrectlyGuessed:'" + this.lettersIncorrectlyGuessed + "'" + "<br>");
        document.write("nbrLettersGuessedIncorrect:" + this.nbrLettersGuessedIncorrect + "<br>");
        document.write("guessedCorrectly:" + this.guessedCorrectly + "<br>");
    }

    // Log self/this
    log() {
        // WordGuessGame properties
        console.log("wins:" + this.nbrWins);
        console.log("nextWordIndex: '" + this.nextWordIndex + "'");
        // wordArray();
        // imageArray();

        // "word" properties - i.e. properties for one word guess - refactor to object
        console.log("gameInProgress:'" + this.gameInProgress + "'");
        console.log("wordToGuess:'" + this.wordToGuess + "'");
        console.log("wordImage:'" + this.wordImage + "'");
        console.log("currentGuess:'" + this.currentGuess + "'");
        console.log("lettersGuessed:'" + this.lettersGuessed + "'");
        console.log("incorrectGuessesLeft:" + this.incorrectGuessesLeft);
        console.log("lettersCorrectlyGuessed:'" + this.lettersCorrectlyGuessed + "'");
        console.log("nbrLettersGuessedCorrect:" + this.nbrLettersGuessedCorrect);
        console.log("lettersIncorrectlyGuessed:'" + this.lettersIncorrectlyGuessed + "'");
        console.log("nbrLettersGuessedIncorrect:" + this.nbrLettersGuessedIncorrect);
        console.log("guessedCorrectly:'" + this.guessedCorrectly + "'");
    }
}
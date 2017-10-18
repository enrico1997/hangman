//Global Variables
var wordLists = {
	["hermione", "harry", "spells", "hagrid", "quidditch",  "muggle"]
};
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];

var winCount = 0;
var lossCount = 0;
var guessesLeft = 5;

// Functions

function startGame() {
	selectedWord = wordLists[Math.floor(Math.random() * wordLists.length)];
	lettersinWord = selectedWord.split("");
	numBlanks = lettersinWord.length;

	// Reset
	guessesLeft=5;
	wrongLetters=[];
	blanksAndSuccesses=[];
	for (var i=0; i<numBlanks; i++) {
		blanksAndSuccesses.push("_");
	}

	// Update HTML
	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("winCounter").innerHTML = winCount;
	document.getElementById("lossCounter").innerHTML = lossCount;

	console.log("Selected Word: ", selectedWord);
	console.log("Letters in Word:", lettersinWord);
	console.log("Number of Blanks: ", numBlanks);
	console.log("Blanks & Successes: ", blanksAndSuccesses);
}

function checkLetters(letter) {
	// Check if letter exists
	var isLetterInWord = false;
	for (var i=0; i<numBlanks; i++) {
		if(selectedWord[i] == letter) {
			isLetterInWord = true;
		}
	}
	if(isLetterInWord) {
		for (var i=0; i<numBlanks; i++) {
			if(selectedWord[i] == letter) {	
				blanksAndSuccesses[i] = letter;			
			}
		}
	}
	else {
		wrongLetters.push(letter);
		guessesLeft--;
	}
	console.log("New Blanks and Successes: ", blanksAndSuccesses);
}

function roundComplete() {
	console.log("Win count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left: " + guessesLeft);

	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");


	if (lettersinWord.toString() == blanksAndSuccesses.toString()) {
		winCount++;
		document.getElementById("winCounter").innerHTML = winCount;
		document.getElementById("winOrLoss").innerHTML = "You Won!";
		startGame();
	}
	else if (guessesLeft == 0) {
		lossCount++;
		document.getElementById("winOrLoss").innerHTML = "You Lost!";
		document.getElementById("lossCounter").innerHTML = lossCount;
		startGame();
	}
}

// Main Process
startGame();

document.onkeyup = function(event) {
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	checkLetters(letterGuessed);
	roundComplete();
	console.log("Letter Guessed: ", letterGuessed);
}


//Variables
var selectableMovies = 
    [
        "karatekid",
        "policeacademy",
        "goonies",
        "backtothefuture",
        "indianajones", 
        "extraterrestial",
        "footloose",
        "ghostbusters",
        "neverendingstory",
        "starwars",
    ];



const maxGuess = 10;           

var guessedLetters = [];
var currentMovieIndex;
var guessingMovie = [];
var remainingGuesses = 0;
var gameStarted = false;
var hasFinished = false;
var wins = 0;

// Reset our game-level variables
function resetGame() {
  remainingGuesses = maxGuess;
  gameStarted = false;

  // Use Math.floor to round the random number down to the nearest whole.
  currentMovieIndex = Math.floor(Math.random() * (selectableMovies.length));

  // Clear out arrays
  guessedLetters = [];
  guessingMovie = [];
  
  // movie image should be hiding
  document.getElementById("movieImage").src = "";

  // Build the guessing word and clear it out
  for (var i = 0; i < selectableMovies[currentMovieIndex].length; i++) {
      guessingMovie.push("_");
  }
  
  // // Hide game over and win images/text
  document.getElementById("failed-image").style.cssText= "display: none";
  

  // Show display
  updateDisplay();
};

//  Updates the display on the HTML Page
function updateDisplay() {

  document.getElementById("totalWins").innerText = wins;
  document.getElementById("currentWord").innerText = "";

  for (var i = 0; i < guessingMovie.length; i++) {
      document.getElementById("currentWord").innerText += guessingMovie[i];
  }
  document.getElementById("remainingGuesses").innerText = remainingGuesses;
  document.getElementById("guessedLetters").innerText = guessedLetters;

  if(remainingGuesses <= 0) {
        // you lose
      document.getElementById("failed-image").style.cssText = "display:block";
      hasFinished = true;
      document.getElementById('audio1').play();   
      
  }
};

document.onkeydown = function(event) {
 
  if(hasFinished) {
      resetGame();
      hasFinished = false;
  } else {
      // Check to make sure a-z was pressed.
      if(event.keyCode >= 65 && event.keyCode <= 90) {
          makeGuess(event.key.toLowerCase());
      }
  }
};

function makeGuess(letter) {
  if (remainingGuesses > 0) {
      if (!gameStarted) {
          gameStarted = true;
      }

      // Make sure we didn't use this letter yet
      if (guessedLetters.indexOf(letter) === -1) {
          guessedLetters.push(letter);
          evaluateGuess(letter);
      }
  }
  
  updateDisplay();
  checkWin();
};


function evaluateGuess(letter) {
    var positions = [];

  // Loop through movie 
  for (var i = 0; i < selectableMovies[currentMovieIndex].length; i++) {
      if(selectableMovies[currentMovieIndex][i] === letter) {
          positions.push(i);
      }
  }

  // if there are no indicies, remove a guess and update the movie image
  if (positions.length <= 0) {
      remainingGuesses--;
     
  } else {
      // Loop through all the indicies and replace the '_' with a letter.
      for(var i = 0; i < positions.length; i++) {
          guessingMovie[positions[i]] = letter;
      }
  }
};
function checkWin() {
  if(guessingMovie.indexOf("_") === -1) {
     
      document.getElementById("movieImage").src = "assets/images/" + selectableMovies[currentMovieIndex].toString() + ".jpg"; 
      wins++;
      hasFinished = true;
      document.getElementById('audio2').play();
  }
};

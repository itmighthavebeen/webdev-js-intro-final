//
// 3 guesses console game
//
"use strict";

//
//variables
//
let randomNumberAnswer;
let triesRemaining = 3;
let allYourGuesses = [];
let minRange = 1;  // computer start min guess
let maxRange = 10; // computer start max guess
let computerGuessedCorrectly = false;


//
// DOM elements
//
const guessInput = document.getElementById("guess-input");
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");
const guessMessage = document.getElementById("guess-message");
const currentGuess = document.getElementById("current-guess");
const computerGuess = document.getElementById("computer-guess");
const allYourGuessesElem = document.getElementById("guess-history");

//
//clear class list
guessMessage.classList.remove("correct", "too-high", "too-low", "invalid", "game-over");

//Function
//Purpose - Clear Input Field
function clearInputField() {
    guessInput.value = "";  // Clears the input field
}
//Function
//Purpose - clear class list
function clearClassList(){
    guessMessage.classList.remove("correct", "too-high", "too-low", "invalid", "game-over");
}

//Function
//Purpose - Begin guessing game
function beginGame() {
    //get number between 1 and 10 - no zeros!
    randomNumberAnswer = Math.ceil(Math.random() * 10);
    console.log(randomNumberAnswer);
    triesRemaining = 3;
    allYourGuesses = [];
    allYourGuessesElem.textContent = "";
    currentGuess.textContent = "";
    computerGuess.textContent = "";
    guessMessage.textContent = "Make a guess between 1 and 10!";
    restartBtn.disabled = true;
    submitBtn.disabled = false;
    guessInput.disabled = false;
    guessInput.value = "";
    minRange = 1; // Reset minimum range for computer guess
    maxRange = 10; // Reset maximum range for computer guess
    computerGuessedCorrectly = false;
     // Focus on the input field after restarting or beginning the game
     guessInput.focus();
}

// Function
// Purpose - evaluate what they guess
function submitGuess() {
    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
        clearClassList();
        guessMessage.textContent = "Please enter a valid number between 1 and 10.Remember you are playing against the computer-think wisely!";
        guessMessage.classList.add("invalid");
        clearInputField();
        return;
    }
  
    // Update the current guess displayed
    currentGuess.textContent = `Current Guess= ${userGuess}`;
   
// 
    //add to the guess array
    allYourGuesses.push(userGuess);
    allYourGuessesElem.textContent = `Guess History= ${allYourGuesses.join(", ")}`;

if (!computerGuessedCorrectly) {
    const compGuess = Math.floor((minRange + maxRange) / 2);
    computerGuess.textContent = `Computer Guess= ${compGuess}`;
 
    // Check if the guess is correct
    if (userGuess === randomNumberAnswer && compGuess === randomNumberAnswer) {
        computerGuessedCorrectly = true;
        clearClassList();
        guessMessage.textContent = `Result is Correct! You and the computer both guessed the number of ${randomNumberAnswer}. Hit Restart or CTRL R to restart the game. Good Luck!`;
        guessMessage.classList.add("correct");
        submitBtn.disabled = true;
        guessInput.disabled = true;
        restartBtn.disabled = false;
    } else if (userGuess === randomNumberAnswer){
        clearClassList();
        guessMessage.textContent = `Result is Correct! You guessed the number of ${randomNumberAnswer}. Hit Restart or CTRL R to restart the game. Good Luck!`;
        guessMessage.classList.add("correct");
        submitBtn.disabled = true;
        guessInput.disabled = true;
        restartBtn.disabled = false;
    }
    else if (compGuess === randomNumberAnswer) {
        computerGuessedCorrectly = true;
        guessMessage.textContent = `Result is The computer guessed the number ${compGuess} and won! Hit Restart or CTRL R to restart the game. Good Luck!`;
        guessMessage.classList.add("correct");
        clearClassList;
        submitBtn.disabled = true;
        guessInput.disabled = true;
        restartBtn.disabled = false;
    }
        else {
        //subtract from the number of tries
        triesRemaining--;

        if (triesRemaining === 0) {
            let difference = randomNumberAnswer - userGuess;
            clearClassList();
            guessMessage.textContent = `Result is 3 guesses have been made. Game over! The number was ${randomNumberAnswer}. You were off by ${Math.abs(difference)}. Hit Restart or CTRL R to restart the game. Good Luck!`;
            guessMessage.classList.add("game-over");

            submitBtn.disabled = true;
            guessInput.disabled = true;
            restartBtn.disabled = false;
        } else {
               // decide whether the guess is too high or too low
                clearClassList();
                if (userGuess > randomNumberAnswer) {
                    guessMessage.textContent = "Result of guess is Tone it down...Too high! Try again.";
                    guessMessage.classList.add("too-high"); 
                    maxRange = userGuess - 1;

                } else {
                    guessMessage.textContent = "Result of guess is Uh oh...Too low! Try again.";
                    guessMessage.classList.add("too-low"); 
                    minRange = userGuess + 1;
                }
            
        }
    }
      clearInputField();

    
    }
   
}

// Function to restart the game
function rebeginGame() {
    beginGame();
}

// Event listeners
submitBtn.addEventListener("click", submitGuess);
restartBtn.addEventListener("click", rebeginGame);
// Add an event listener for the "Enter" key on the input field
guessInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        submitGuess();
    }
});
// Event listener for keyboard shortcut (Ctrl + R)
document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key.toLowerCase() === "r") {
        // Prevent the default browser behavior of refreshing the page
        event.preventDefault();

        // Highlight the "R" in the Restart button
        restartBtn.classList.add("highlight");

        // Call the restart game function
        rebeginGame();
    }
});

// Highlight the "R" when the mouse hovers over the button
restartBtn.addEventListener("mouseover", () => {
    document.getElementById("highlight-r").style.color = "yellow"; // Changes color on hover
});

// Optional: Reset highlighting after the game is restarted
function rebeginGame() {
    beginGame(); // Restart the game logic
    restartBtn.classList.remove("highlight"); // Remove highlight after restart
}


// Start the first game
beginGame();

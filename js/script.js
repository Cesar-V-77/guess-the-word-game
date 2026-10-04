// The unordered list where the guessed letters will appear
const guessLetters = document.querySelector(".guessed-letters");
// The button that submits a guessed letter
const guessButton = document.querySelector(".guess");
// The text input where the player will guess a letter
const letterInput = document.querySelector(".letter");
// The empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
// The paragraph where the remaining guesses will display
const remainingGuesses = document.querySelector(".remaining");
// The span inside the paragraph where the remaining guesses will display
const remainingSpan = document.querySelector(".remaining span");
// The empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

const guessedLetters = [];

// Function to update the word in progress with dots for unguessed letters
const updatedWord = function (word) {
  const wordArray = [];
  for (let letter of word) {
    console.log(letter);
    wordArray.push("●");
  }

  wordInProgress.innerHTML = wordArray.join("");
  return wordArray;
};

updatedWord(word);
console.log(updatedWord(word));

// Event listener for the guess button
guessButton.addEventListener("click", function (e) {
  e.preventDefault();

  const wordValue = letterInput.value;
  letterInput.value = "";
  console.log(wordValue);
  message.innerHTML = "";

  const results = checkInput(wordValue);
  console.log(results);

  if (results !== undefined) {
    makeGuess(results);
  }
});

// Function to check if the input is valid
const checkInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerHTML = "Please enter a letter.";
  } else if (input.length > 1) {
    message.innerHTML = "Please enter a single letter.";
  } else if (!input.match(acceptedLetter)) {
    message.innerHTML = "Please enter a letter from A to Z.";
  } else {
    return input;
  }
};

//Function to process valid guessed letter
const makeGuess = function (letter) {
  letter = letter.toUpperCase();

  if (guessedLetters.includes(letter)) {
    message.innerHTML = "You've already guessed that letter. Try again.";
  } else {
    guessedLetters.push(letter);
  }
  if (guessedLetters.includes(letter)) {
    displayGuessLetters(guessedLetters);
  }

  console.log(guessedLetters);
};

// Function to display guessed letters in the unordered list
const displayGuessLetters = function (guessedLetters) {
  guessLetters.innerHTML = "";
  for (let letter of guessedLetters) {
    let li = document.createElement("li");
    li.innerHTML = letter;
    guessLetters.append(li);
  }
};

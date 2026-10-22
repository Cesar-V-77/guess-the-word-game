// The unordered list where the guessed letters will appear
const guessLetters = document.querySelector(".guessed-letters");
// The button that submits a guessed letter
const guessButton = document.querySelector(".guess");
// The text input where the player will guess a letter
const letterInput = document.querySelector(".letter");
// The empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
// The paragraph where the remaining guesses will display
const remainingGuessesElement = document.querySelector(".remaining");
// The span inside the paragraph where the remaining guesses will display
const remainingSpan = document.querySelector(".remaining span");
// The empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");

const guessedLetters = [];

let remainingGuesses = 8;

//Function to fetch a random word from the provided URL and update the word in progress
const getWord = async function () {
  const response = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt",
  );
  const words = await response.text();
  // console.log(words);

  const wordArray = words.split("\n");
  // console.log(wordArray);
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  updatedWord(word);
};

getWord();
let word = "magnolia";

// Function to update the word in progress with dots for unguessed letters
const updatedWord = function (word) {
  const wordArray = [];
  for (let letter of word) {
    // console.log(letter);
    wordArray.push("●");
  }

  wordInProgress.innerHTML = wordArray.join("");
  return wordArray;
};

// updatedWord(word);
// console.log(updatedWord(word));

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

  updateRemainingGuesses(letter);
  console.log(guessedLetters);
  progressWord(guessedLetters);
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

// Function to update the word in progress with guessed letters and dots for unguessed letters
const progressWord = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");

  console.log(wordArray);

  const newWord = [];
  for (let letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      newWord.push(letter.toUpperCase());
    } else {
      newWord.push("●");
    }
  }

  wordInProgress.innerHTML = newWord.join("");
  checkWin();
};

// Function to update the remaining guesses and display messages
const updateRemainingGuesses = function (guess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(guess)) {
    message.innerHTML = `Sorry, the word has no ${guess}.`;
    remainingGuesses -= 1;
  } else if (upperWord.includes(guess)) {
    message.innerHTML = `Good guess! The word has the letter ${guess}.`;
  }
  if (remainingGuesses === 0) {
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
  } else if (remainingGuesses === 1) {
    remainingSpan.innerHTML = `${remainingGuesses} guess`;
  } else if (remainingGuesses > 1) {
    remainingSpan.innerHTML = `${remainingGuesses} guesses`;
  }
};

// Function to check if the player has guessed the correct word
const checkWin = function () {
  if (wordInProgress.innerHTML === word.toUpperCase()) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Conrats!</p>`;
  }
};

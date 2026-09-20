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

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const wordValue = letterInput.value;
  letterInput.value = "";
  console.log(wordValue);
});

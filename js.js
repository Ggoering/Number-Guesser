// Button assignments
var guessButton = document.getElementById('user-guess-submit');
var clearButton = document.getElementById('user-guess-clear');
var resetButton = document.getElementById('game-reset');
var minRangeSetting = document.getElementById('min-range-setting');
var maxRangeSetting = document.getElementById('max-range-setting');
var userGuessField = document.getElementById('user-guess');


// Changing Text
var hintText = document.getElementById("guess-hint");
var guessDisplay = document.getElementById("guess-display");
var upperText = document.getElementById("last-guess");

// Global Number variables;
var secretNumber;
var min = parseInt(minRangeSetting.value);
var max = parseInt(maxRangeSetting.value);
var userGuessCount = 0;

// Generate our random number from the min-max user inputs
function getNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    secretNumber = Math.floor(Math.random() * (max + 1 - min)) + min;
}

// Accept and translate user input
guessButton.addEventListener('click', function() {
    console.log(secretNumber);
    userGuessCount++;
    var userGuess = document.getElementById('user-guess');
    userGuess = userGuess.value;
    userGuess = parseInt(userGuess, 10);
    upperText.innerText = "Your last guess was:";
    guessDisplay.innerText = userGuess;
    checkGuess(userGuess);
});

// Primary Game functionality
function checkGuess(userGuess) {
    if (userGuess > secretNumber) {
        hintText.innerText = "That is too high"
    } else if (userGuess < secretNumber) {
        hintText.innerText = "That is too low"
    } else if (userGuess === secretNumber) {
        hintText.innerText = "Difficulty Increased.  Minimum range -10. Maximum range +10.";
        guessDisplay.innerText = "BOOM";
        upperText.innerText = "";
        min = min - 10;
        max = max + 10;
        // vvvvvv I HATE YOU vvvvvvv
        // document.getElementById('min-range-setting').setAttribute("value", min);
        // document.getElementById('max-range-setting').setAttribute("value", max);
        maxRangeSetting.value = max
        minRangeSetting.value = min
        getNumber(min, max);

    } else {
        guessDisplay.innerText = "You fucked up. Try again. Enter a number between" + " " + min + " " + "and " + max;
    }
};

// Clear button functionality to remove user text from input field
clearButton.addEventListener('click', function() {
    document.getElementById('user-guess').value = "";
});

// reset button returns game to starting state.  Input fields are back to default 1 and 10.
resetButton.addEventListener('click', function() {
    document.getElementById('user-guess').value = "";
    min = 1;
    max = 10;
    getNumber(min, max)
    userGuessCount = 0;
    hintText.innerText = ""
    guessDisplay.innerText = ""
    upperText.innerText = "Welcome!"
    maxRangeSetting.value = 10
    minRangeSetting.value = 1
    resetDisable()
});

// Automatically change erroneous values to the max or min range of the function. called in the #user-guess input field on change so it covers copy/paste too
function restrictInput() {
    if (document.getElementById('user-guess').value < min) document.getElementById('user-guess').value = min;
    if (document.getElementById('user-guess').value > max) document.getElementById('user-guess').value = max;
}
// when finished typing each key into the min field the min range updates and a new num generated
minRangeSetting.addEventListener('keyup', function() {
    annoying = parseInt(minRangeSetting.value)
    min = annoying
    getNumber(min, max);
});

// when finished typing each key into the min field the max range updates and a new num generated
maxRangeSetting.addEventListener('keyup', function() {
    shit = parseInt(maxRangeSetting.value)
    max = shit
    getNumber(min, max);
});

// zero-state of game
function resetDisable() {
    if (min == 1 &&
        max == 10 &&
        userGuessCount == 0 &&
        hintText.innerText == "" &&
        guessDisplay.innerText == "" &&
        upperText.innerText == "Welcome!" &&
        maxRangeSetting.value == 10 &&
        minRangeSetting.value == 1 ===
        true) {

        resetButton.disabled = true;
        clearButton.disabled = true;
    }
};



// Re-activate reset button if necessary
userGuessField.addEventListener('input', function() {
    if (userGuessField.value == "") {
        resetDisable()
        clearButton.disabled = true
    } else {
        resetButton.disabled = false;
        clearButton.disabled = false;
    }
});

//Enable reset button if the user changes the range
maxRangeSetting.addEventListener('input', function() {
    resetButton.disabled = false;
});

minRangeSetting.addEventListener('input', function() {
    resetButton.disabled = false;
});

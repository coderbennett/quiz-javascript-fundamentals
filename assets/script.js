// initialize references to elements in the HTML needed for the script
var timerEl = document.querySelector("#timer");
var scoreEl = document.querySelector("#score");
var quizEl = document.querySelector("#quizContainer");
var quizBtn = document.querySelector("#quizStart");
var retryBtn = document.querySelector("#retry");
var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");
var highscoresEl = document.querySelector("#highscores");
var formEl = document.querySelector("#highscoreForm");
var inputEl = document.querySelector("#initials");

// initialize global variables
var score = 0;
var secondsLeft;
var timerInterval;
var questionNo = 0;
var highScores = [];

//check to see if there is anything in the local storage
//if not, we should set up the highscores array within local storage
if (localStorage.getItem("highScores") === null) {
    localStorage.setItem("highScores", JSON.stringify([]));
}

// initialize questions object
// each question object has 4 possible answers,
// a question, and a correct key with the correct answer string
var questions = {
    0: {
        q: "What array method will return the number of elements it contains?",
        a1: ".size",
        a2: ".maxIndex",
        a3: ".length",
        a4: ".contains",
        correct: ".length"
    },
    1: {
        q: "What string method returns two strings together?",
        a1: ".join",
        a2: ".concat",
        a3: ".add",
        a4: ".combine",
        correct: ".concat"
    },
    2: {
        q: "Which array method acts similar to a for loop?",
        a1: ".filter",
        a2: ".forLoop",
        a3: ".forEach",
        a4: ".loopFor",
        correct: ".forEach"
    },
    3: {
        q: "Which of the following is not an iterator?",
        a1: ".iterate",
        a2: "while loop",
        a3: ".forEach",
        a4: "for loop",
        correct: ".iterate"
    },
    4: {
        q: "Which is the proper syntax of a for loop?",
        a1: "for (let i > 0; i++)",
        a2: "for (var i = 16, i > -1, i--)",
        a3: "for (let i; i++; i = 9)",
        a4: "for (var i = 0; i < 6; i++)",
        correct: "for (var i = 0; i < 6; i++)"
    },
    5: {
        q: "In a switch case, what does the default clause do?",
        a1: "The default clause always executes.",
        a2: "The default clause only executes if no other case passes.",
        a3: "The default clause never executes.",
        a4: "The default clause executes before other cases are checked.",
        correct: "The default clause only executes if no other case passes."
    },
    6: {
        q: "What does the modulo (%) operator do?",
        a1: "Rounds decimals up to the nearest whole number.",
        a2: "Turns a fraction into a percent.",
        a3: "Returns the remainder of two values.",
        a4: "Divides two values.",
        correct: "Returns the remainder of two values."
    },
    7: {
        q: "Objects contain pairs of what?",
        a1: "keys and values",
        a2: "properties and keys",
        a3: "values and properties",
        a4: "keys and data",
        correct: "keys and values"
    },
    8: {
        q: "'typeof NaN' will return what value?",
        a1: "null",
        a2: "undefined",
        a3: "number",
        a4: "string",
        correct: "number"
    },
    9: {
        q: "Which of the following is a strict equality operator?",
        a1: "==!",
        a2: "====",
        a3: "==",
        a4: "===",
        correct: "==="
    }
};

// hide the event listener if the quiz button is not active
if(quizBtn){
    quizBtn.addEventListener("click", startQuiz);
}

// hide the answers event listeners if the answers list is not active
if(answersEl) {
    answersEl.children[0].addEventListener("click", answerQuestion);
    answersEl.children[1].addEventListener("click", answerQuestion);
    answersEl.children[2].addEventListener("click", answerQuestion);
    answersEl.children[3].addEventListener("click", answerQuestion);
}

//if the form is active, listen for the submit event and invoke addHighScore
if(formEl) {
    formEl.addEventListener("submit", addHighScore);
}

//if the retry button is active, listen for the click event to reset the game
if(retryBtn) {
    retryBtn.addEventListener("click", resetGame);
}

//this function starts the quiz functions/elements
function startQuiz() {

    //set score to 0 for the start,
    score = 0;
    scoreEl.textContent = "Score: " + score;

    //hide the quiz button to make room for the questions
    quizBtn.setAttribute("style", "display:none;");

    //set the display to inline for the question so we can see it
    questionEl.setAttribute("style", "display:inline;");

    //set the display to flex so we can see the answers list
    answersEl.setAttribute("style", "display:flex;");

    //start the timer for the quiz
    startTimer();

    //invoke the displayQuestion function so we can see the first question
    displayQuestion();
}

function startTimer() {
    //set the seconds to 75, this is the total time a user will get at the start
    secondsLeft = 75;

    //set up the timer interval to count down every 1000 milliseconds (1 second)
    timerInterval = setInterval(function() {

        //this is our timer variable, it will subtract one from itself at each interval
        secondsLeft--;

        //every second we should update the text content of the timer element
        timerEl.textContent = "Timer: " + secondsLeft;

        //if the time is up
        if(secondsLeft <= 0) {
            //invoke the gameOver function
            gameOver();
        }

    }, 1000);

};

//this function sets the text content of the list elements in the answers list
//it also sets the question (based on what question number we are on)
function displayQuestion() {
    questionEl.textContent = questions[questionNo].q;
    answersEl.children[0].textContent = questions[questionNo].a1;
    answersEl.children[1].textContent = questions[questionNo].a2;
    answersEl.children[2].textContent = questions[questionNo].a3;
    answersEl.children[3].textContent = questions[questionNo].a4;
};

//this function is invoked when the user clicks on an answer
function answerQuestion(event) {

    //if the text of the answer is equal to the question's correct
    //answer then good job lets give the user 50 points and update
    //the score text content
   if (event.target.textContent === questions[questionNo].correct) {
       score += 50;
       scoreEl.textContent = "Score: " + score;
       //else they were wrong and we should deduct 10 seconds from
       //the timer
   } else {
       secondsLeft -= 10;
   }
   
   //if they are on any question other than 9
   //update the question number to the next question
   //and display that question
   if (questionNo < 9) {
    questionNo++;
    displayQuestion();
    //else they have completed all the questions and the
    //quiz is over!!
    //bonus for completion- we add the seconds left to
    //the user's score
   } else {
       score += secondsLeft;
       scoreEl.textContent = "Score: " + score;
       gameOver();
   }
};

//this function is invoked when the player runs out of time or if
//the player runs out of questions
function gameOver() {
    //set the seconds left to zero just incase it dips below 0
    secondsLeft = 0;

    //stop the timer
    clearInterval(timerInterval);

    //remove the answers from the li elements
    answersEl.children[0].textContent = "";
    answersEl.children[1].textContent = "";
    answersEl.children[2].textContent = "";
    answersEl.children[3].textContent = "";

    //remove the display for the question & answers elements
    // questionEl.setAttribute("style", "display:none;");
    answersEl.setAttribute("style", "display:none;");

    //turn the question element into a temporary highscores header
    questionEl.textContent = "Highscores:";

    //set the form display so we can view it on the screen
    formEl.setAttribute("style", "display:block;");
    
}

//this function runs when the initials form is submitted
function addHighScore(event) {
    event.preventDefault();

    //store the user input as the userInitials variable
    var userInitials = inputEl.value;
    //stop displaying the form now that they have used it
    formEl.setAttribute("style", "display:none;");

    //initialize the highScore object to be used shortly
    var highScoreObj = {
        initials: userInitials,
        highscore: score
    };

    //set the highScores to the parsed array of objects from localstorage
    highScores = JSON.parse(localStorage.getItem("highScores"));

    //push the new highscore object to the end of the array
    highScores.push(highScoreObj);

    //update the localstorage with the new highscore array but stringify it
    localStorage.setItem("highScores", JSON.stringify(highScores));

    //we then call the displayHighScores function to display the highscores list
    displayHighScores();
}

//this function displays the highscores in order from highest to lowest
function displayHighScores() {
    //initialize an liArray to hold all the li elements holding high scores
    var liArray = [];

    //set the highscores list to be displayed
    highscoresEl.setAttribute("style", "display:flex;");

    //pull the parsed array from local storage to ensure correct highscore data
    highScores = JSON.parse(localStorage.getItem("highScores"));

    //sort through the object and compare highscores to have the list ordered correctly
    highScores = highScores.sort(compareHighScores);

    //loop highScores.length times to create a li element for each highscore entry
    for (var i = 0; i < highScores.length; i++) {
        //create the li element and store it in the recently initialized array
        liArray[i] = document.createElement("li");

        //set the new li element as a child of the highscores element
        highscoresEl.appendChild(liArray[i]);

        //set the text content of the li element to show the user initials and 
        //high score
        liArray[i].textContent = highScores[i].initials + ": " + highScores[i].highscore;
    }

    //make the retry button visible by setting the display to inline
    retryBtn.setAttribute("style", "display:inline;");

}

//this is a simple comparison function which is used to sort the objects
//in the highscore array
function compareHighScores(user1, user2) {
    return user2.highscore - user1.highscore;
}

//this function is called when the user clicks retry, and resets some parts
//of the game
function resetGame() {
    //this will bring us back to the first question
    questionNo = 0;

    //this for loop removes all the highscore li elements to clear up space
    //for the quiz elements
    for (var i = highScores.length - 1; i > -1; i--) {
        highscoresEl.children[i].remove();
    }

    //we stop displaying the retry button
    retryBtn.setAttribute("style", "display:none;");

    //we call the start quiz function again, restarting the quiz
    startQuiz();
}
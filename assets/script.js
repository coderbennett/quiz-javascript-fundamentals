// initialize references to elements in the HTML needed for the script
var timerEl = document.querySelector("#timer");
var scoreEl = document.querySelector("#score");
var quizEl = document.querySelector("#quizContainer");
var quizBtn = document.querySelector("#quizStart");
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

if (localStorage.getItem("highScores") === null) {
    localStorage.setItem("highScores", JSON.stringify([]));
}

// initialize questions object
// each question object has 4 possible answers,
// a question, and a correct key with the index which the
// correct answer is at

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

//needs work isnt working
if(inputEl) {
    inputEl.addEventListener("input", addHighScore);
}

function startQuiz() {

    //set score to 0 for the start,
    score = 0;

    //hide the quiz button to make room for the questions
    quizBtn.setAttribute("style", "display:none;");

    questionEl.setAttribute("style", "display:inline;");

    answersEl.setAttribute("style", "display:flex;");

    //start the timer for the quiz
    startTimer();

    displayQuestion();
}

function startTimer() {

    secondsLeft = 75;

    //set up the timer interval to count down every 1000 milliseconds (1 second)
    timerInterval = setInterval(function() {

        //this is our timer variable, it will subtract one from itself at each interval
        secondsLeft--;

        //every second we should update the text content of the timer element
        timerEl.textContent = "Timer: " + secondsLeft;

        //if the time is up
        if(secondsLeft === 0) {
            //invoke the gameOver function
            gameOver();
        }

    }, 1000);

};

function displayQuestion() {
    questionEl.textContent = questions[questionNo].q;
    answersEl.children[0].textContent = questions[questionNo].a1;
    answersEl.children[1].textContent = questions[questionNo].a2;
    answersEl.children[2].textContent = questions[questionNo].a3;
    answersEl.children[3].textContent = questions[questionNo].a4;
};

function answerQuestion(event) {
   if (event.target.textContent === questions[questionNo].correct) {
       score += 50;
       scoreEl.textContent = "Score: " + score;
   } else {
       secondsLeft -= 10;
   }
   
   if (questionNo < 9) {
    questionNo++;
    displayQuestion();
   } else {
       score += secondsLeft;
       gameOver();
   }
};

function gameOver() {
    clearInterval(timerInterval);
    questionEl.textContent = "";
    answersEl.children[0].textContent = "";
    answersEl.children[1].textContent = "";
    answersEl.children[2].textContent = "";
    answersEl.children[3].textContent = "";

    questionEl.setAttribute("style", "display:none;");

    answersEl.setAttribute("style", "display:none;");

    formEl.setAttribute("style", "display:block;");
    
}

//needs work? isnt working
function addHighScore(event) {
    console.log("addhighscore function was triggered");
    event.preventDefault();
    var userInitials = inputEl.value;
    formEl.setAttribute("style", "display:none;");

    var highScoreObj = {
        initials: userInitials,
        highscore: score
    };

    if (JSON.parse(localStorage.getItem("highScores")) === []) {
        highScores.push(JSON.parse(localStorage.getItem("highScores")));
        localStorage.setItem("highScores", JSON.stringify(highScores));

    } else {
        highScores = [];
        highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        highScores.push(highScoreObj);
        localStorage.setItem("highScores", JSON.stringify(highScores));
    }

    displayHighScores();
}

function displayHighScores() {
    var liArray = [];

    highscoresEl.setAttribute("style", "display:block;");

    highScores = JSON.parse(localStorage.getItem("highScores"));

    for (var i = 0; i < highScores.length; i++) {
        liArray[i] = document.createElement("li");
        highscoresEl.appendChild(liArray[i]);
        liArray[i].textContent = "1. " + highScores[i].initials + ": " + highScores[i].highscore;
    }

    quizBtn.setAttribute("style", "display:box;");
}

// start game with button
// to do this we will need an addeventlistener with
// a quiz function

// the quiz function will likely be the mother function
// she will have all the other functions within

// there will need to be a function that displays
// the current question, with all the children
// answers/responses

// there will need to be a function that holds each question?
// possibly a questions object that holds all the 
// questions as objects and the questions have
// answers as values within

// there will need to be a timer function
// we need to ensure that time is subtracted from
// this timer when you answer incorrectly

// gameOver function, which should be the same for
// either completing all the questions or running out 
// of time

// highscores page which holds all the scores on localStorage
// the highscores page will need an input form
// the input form needs to take in two initials ONLY
// it must also store those initials & connect them
// to the highscore for that game- object? array with string & number?
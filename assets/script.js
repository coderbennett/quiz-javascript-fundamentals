// initialize references to elements in the HTML needed for the script
var timerEl = document.querySelector("#timer");
var quizEl = document.querySelector("#quizContainer");

// initialize global variables
var score;
var secondsLeft = 75;
var timeInterval;

// initialize questions object
// each question object has 4 possible answers,
// a question, and a correct key with the index which the
// correct answer is at

var questions = {
    question1 : {
        q : "What array method will return the number of elements it contains?",
        a1 : ".size",
        a2 : ".maxIndex",
        a3 : ".length",
        a4 : ".contains",
        correct : 3
    },
    question2 : {
        q : "What string method returns two strings together?",
        a1 : ".join",
        a2 : ".concat",
        a3 : ".add",
        a4 : ".combine",
        correct : 2
    }
};

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
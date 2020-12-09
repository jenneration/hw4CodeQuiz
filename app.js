console.log("I'm running");
//HTML Elements
var startBtn = document.querySelector(".btn-startjg");
var startPage = document.querySelector("#startPage");
var quizPage = document.querySelector("#quiz-page");
var finishPage = document.querySelector("#finish-page");
var scoreSpan = document.querySelector(".score");
var scorePage = document.querySelector("#score-page");
var returnBtn = document.querySelector(".return-btn");
var returnBtn2 = document.querySelector(".return-btn2");
var clearScore = document.querySelector(".score-btn");
var questionEl = document.querySelector(".questionEl");
var timer = document.querySelector(".timer");
var answerBtn = document.querySelectorAll(".answerBtn");
var btnA = document.querySelector("#btnA");
var btnB = document.querySelector("#btnB");
var btnC = document.querySelector("#btnC");
var btnD = document.querySelector("#btnD");
var form = document.querySelector("form");
var submitBtn = document.querySelector(".submit-btn");
var scoreboard = document.querySelector("#scoreboard"); // ul
var nameEle = document.querySelector("#name");
var notifier = document.querySelector(".notifier");

//Created variables
var questionList = [
  {
    question: "What is the correct CSS for adding a background color?",
    a: "background-color",
    b: "bgColor",
    c: "background",
    d: "bodybg",
    answer: "A",
  },
  {
    question:
      "Which Bootstrap class provides a responsive fixed width container?",
    a: ".container-stretch",
    b: ".container",
    c: ".container-fixed",
    d: ".container-fluid",
    answer: "D",
  },
  {
    question:
      "Where is the correct place to insert a Javascript script src tag?",
    a: "The head",
    b: "Before ending body tag",
    c: "Below starting body tag",
    d: "None of the above",
    answer: "B",
  },
  {
    question: "What does CSS stand for?",
    a: "Creative Style Sheets",
    b: "Cool Sheet Styles",
    c: "Cascading Style Sheets",
    d: "Color Style Sheets",
    answer: "C",
  },
  {
    question: "How do you call a JS function called myFunction?",
    a: "myFunction()",
    b: "HelloMyFunction",
    c: "callMyFunction()",
    d: "#myfunction",
    answer: "A",
  },
];
var questionIndex = 0; //Use to iterate thru questionList
var lastQuestion = questionList.length - 1;
var count = 10;
var quizSeconds = 0;
var TIMER;
var score = 0;

//Start quiz
function startQuiz() {
  //Hide start container
  startPage.style.display = "none";
  quizPage.classList.remove("hide");
  showQuestion();
  TIMER = setInterval(quizTimer, 1000);
  quizTimer();
}

//Render TIMER
function quizTimer() {
  //Define timer condidtion starting at 10
  if (count >= quizSeconds) {
    timer.textContent = count;
    count--;
  } else {
    //If questions remain, restart timer, show questions
    count = 10;
    if (questionIndex < lastQuestion) {
      questionIndex++;
      showQuestion();
    } else {
      //Stop timer and endquiz
      clearInterval(TIMER);
      endQuiz();
    }
  }
}
//Render questions
function showQuestion() {
  questionEl.textContent = questionList[questionIndex].question;
  btnA.textContent = questionList[questionIndex].a;
  btnB.textContent = questionList[questionIndex].b;
  btnC.textContent = questionList[questionIndex].c;
  btnD.textContent = questionList[questionIndex].d;
}

//Check answer
function checkAnswer(answer) {
  if (this.value === questionList[questionIndex].answer) {
    //Answer is correct
    score++;
  }
  count = 10;
  if (questionIndex < lastQuestion) {
    questionIndex++;
    showQuestion();
  } else {
    clearInterval(TIMER);
    endQuiz();
  }
}

//End Quiz
function endQuiz() {
  quizPage.classList.add("hide");
  finishPage.classList.remove("hide");
  scoreSpan.textContent = `You scored ${score} out of 5`;
  console.log(score);
}

//Return to Start from Quiz Completed page
function returnToStart(event) {
  event.stopPropagation();
  finishPage.classList.add("hide");
  startPage.style.display = "block";
  questionIndex = 0;
  score = 0;
}

//Return to Start from Scoreboard page
function returnToStart2(event) {
  event.stopPropagation();
  scorePage.classList.add("hide");
  startPage.style.display = "block";
  questionIndex = 0;
  score = 0;
}

////////////////START TROUBLE AREA: LOCAL STORAGE ///////////////

//TODO: fix section below
//Check local storage for previous scores WORKING
var scores = JSON.parse(localStorage.getItem("scores"));
//If previous scores, add to text content -- WORKING
scoreboard.textContent = scores;

//Empty array for names to be added to
var nameScores = [];

//Add name to scoreboard, add to local storage
function addNameToScoreboard(event) {
  event.preventDefault();

  var name = nameEle.value;
  var li = document.createElement("li");
  li.innerHTML = "name";
  scoreboard.appendChild(li);

  //Render correct pages
  scorePage.classList.remove("hide");
  finishPage.classList.add("hide");

  //TODO: TRY SEPARATING INTO 2 SMALLER FUNCTIONS AND CALL
  nameScores.push({ name, score });
  console.log(nameScores);
  //Check for previous scores
  var scores = JSON.parse(localStorage.getItem("scores"));
  console.log(scores);

  //TODO: TRY SEPARATING INTO 2 SMALLER FUNCTIONS AND CALL
  //Set new scores
  localStorage.setItem("name", JSON.stringify(name));
  localStorage.setItem("score", JSON.stringify(score));
  JSON.stringify([{ name, score }].concat(scores));
}

//Clear Scores
//TODO: Needs to also clear input - put that part in JSON function somewhere
clearScore.addEventListener("click", function clearScores() {
  localStorage.clear();
  scoreboard.style.display = "none";
});

/////////////// END OF TROUBLE AREA //////////////////

//Start quiz
startBtn.addEventListener("click", startQuiz);

//Button events -- TODO: Refactor this to DRY
btnA.addEventListener("click", checkAnswer);
btnB.addEventListener("click", checkAnswer);
btnC.addEventListener("click", checkAnswer);
btnD.addEventListener("click", checkAnswer);

//Return to Start from Quiz Completed Page
returnBtn.addEventListener("click", returnToStart);

//Return to Start from Scoreboard Page
returnBtn2.addEventListener("click", returnToStart2);

//Add name to scoreboard, add to local Storage funcion
submitBtn.addEventListener("click", addNameToScoreboard);

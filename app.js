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

//Clear Scores
clearScore.addEventListener("click", function clearScores() {
  localStorage.clear();
  scoreboard.style.display = "none";
});
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
//BUTTONS
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

/////////////////////////////////////////////////

//Add name to scoreboard
// submitBtn.addEventListener("click", function(event){
//   event.preventDefault();

// renderScoreboard();

// });
// //Add name to scoreboard
submitBtn.addEventListener("click", addNameToScoreboard);

//Check local storage for previous scores

var storedNameScores = JSON.parse(localStorage.getItem("nameScores")) || [];

//Sort by high to low score **
storedNameScores.sort(function (a, b) {
  return b.score - a.score;
});

// var nameScores = [];

function storenameScores() {
  localStorage.setItem("nameScores", JSON.stringify(storedNameScores));
}

//renderScoreboard();
//Create scoreboard elements
// function renderScoreboard() {
//   scoreboard.innerHTML = "";
//   var name = nameEle.value;
//   // nameScores.forEach(function (person) {
//   //   var h4 = document.createElement("h4");
//   //   h4.innerHTML = person.name + " " + person.score;
//   //   scoreboard.appendChild(h4);
//   // });

//   for (var i = 0; i < nameScores.length; i++) {
//     var h4 = document.createElement("h4");
//     h4.innerHTML = person.name + " " + person.score;
//     scoreboard.appendChild(h4);
//   }

//   //Render correct pages **
//   scorePage.classList.remove("hide");
//   finishPage.classList.add("hide");

//   if (name !== "") {
//     alert("Please enter name.");
//     return;
//   } else {
//     var player = {
//       name,
//       score,
//     };
//     nameScores.push(player);
//   }
// }

/////////////////////////START//////////////////////////
/////LOCAL STORAGE WORKING BLOCK BUT NOT SHOWING LATEST SCORE

// //Add name to scoreboard
function addNameToScoreboard(event) {
  //Push new score to
  event.preventDefault();
  var name = nameEle.value;

  if (name !== "") {
    var player = {
      name,
      score,
    };
    storedNameScores.push(player);
  } else {
    alert("Please enter name.");
    return;
  }
  storenameScores();
  storedNameScores.forEach(function (person) {
    var h4 = document.createElement("h4");
    h4.innerHTML = person.name + " " + person.score;
    scoreboard.appendChild(h4);
  });

  //Render correct pages **
  scorePage.classList.remove("hide");
  finishPage.classList.add("hide");
  // console.log(scores);
}

//Clear Scores
clearScore.addEventListener("click", function clearScores() {
  localStorage.clear();
  scoreboard.style.display = "none";
});

///////////////////////END///////////////////////////

let score = 0;
let savedScores = [];

// questions - multiple choice

let questions = [{
    question: "hello?",
        choices: [
            "1. hi?",
            "2. welcome?",
            "3. goodbye?",
    ],  
    answer: 0
},

{
    question: "hello?",
        choices: [
            "1. hi?",
            "2. welcome?",
            "3. goodbye?",
    ],  
    answer: 1
},

{   question: "hello?",
        choices: [
        "1. hi?",
        "2. welcome?",
        "3. goodbye?",
],  
    answer: 0
},
{   question: "hello?",
        choices: [
            "1. hi?",
            "2. welcome?",
            "3. goodbye?",
],  
    answer: 0     
},
{    question: "hello?",
        choices: [
            "1. hi?",
            "2. welcome?", 
            "3. goodbye?",
],  
    answer: 0
},
];

let startPageel = document.querySelector("#view-high-score");
let countDownEl = document.querySelector("#timer");
let countDowntimer;

function countDown() {
    let viewHighScoreEl = document.querySelector("#view-high-score");
    viewHighScoreEl.textContent = retreiveHighScore();
    timer = questions.length * 10;
    countDowntimer = setInterval(function (){
        countDownEl.textContent = timer;
        timer--;
        // dont finish all questions before timer ends quiz over
        if (timer === 0) {
            roundOver()
        }
    }, 1000);
    // build quiz again skipping start page
    startPageel.classList.add("hidden");
    buildQuiz();
}

// display leader board scores or 0 -- hope im using Json correctly
function retreiveHighScore() {
    let lastHighScore = localStorage.getItem(scoreName);
    let lastHighScore = JSON.parse(lastHighScore);
    if (lastHighScoreArray) {
        return retreiveHighScore = lastHighScoreArray[0].newScore;
    } else return 0;
}

// questions display

let quizQuestionEl = document.getElementById("quiz-question");
let quizAnswerEl = document.getElementById("quiz-answers")
let currentQuestionIndex = 0;

function buildQuiz() {
    quizQuestionEl.classList.remove("hidden");
    let quizQuestion = questions[currentQuestionIndex].question;
    quizQuestionEl.textContent = quizQuestion;
    // for loop for button and answers
    let quizChoices = questions[currentQuestionIndex].choices;
    for (let i = 0; i < quizChoices.length; i++) {
        let quizChoices = quizChoices[i];
        let listItemEl = document.createElement("li");
        listItemEl.classname = "list-choice";
        let selectButton = document.createElement("button");
        selectButton.className = "button-choice";
        selectButton.textContent = quizChoice;

        selectButton.setAttribute("selectedIndex", i);
        selectButton.addEventListener("click", choiceClicked);
        listItemEl.appendChild(selectButton);
        quizAnswerEl.appendChild(listItemEl);
    }
}

// answer right or wrong - give user feedback
function choiceClicked(event) {
    let buttonEl = event.targt;
    if (buttonEl){
        let buttonChosen = parseInt(buttonEl.getAttribute("selctedIndex"));
        let answerChoice = questions[currentQuestionIndex].answer;
      //correct answer
      if (buttonChosen === answerChoice) {
          resultsEL.textContent = ":D";
          score += 5;
          // wrong answer
      } else if (buttonChosen !== answerChoice) {
          resultsEL.testContent = "D:";
          timer -= 10;
        if (timer <= 0){
            roundOver();
        }
          countDownEl.textContent = timer;
      } 
      // feedback for winners
      if (timer > 0) {
        resultsEL.removeAttribute("class", "hidden");
        resultsEL.setAttribute("class", "results");
        setTimeout(feedBackTimeout, 500);
      }
    } 
}
let resultsEL = document.getElementById("question-results");

function resultsTimeout() {
    resultsEL.setAttribute("class", "hidden");
    getNextQuestion();
}

function getNextQuestion() {
    if (timer <= 0) {
        roundOver();
        return;
    } else {
        ++currentQuestionIndex;
    }

    if (currentQuestionIndex >= questions.length) {
        roundOver();
    } else {
        clearAnswers();
        buildQuiz();
    }

    // quiz over set timer to zero
    function roundOver() {
        timer = 0;
        countDownEl.textContent = "Thanks for Playing!";
        clearInterval(countDowntimer);
        clearAnswers();
        endQuiz();
    }
    // clear answers 
    function clearAnswers() {
        let count = quizAnswerEl.childElementCount;
        for (let i = 0; i < count; i++) {
            quizAnswerEl.removeChild(quizAnswerEl.childNodes[0]);
        }
    }
    let quizEndEl = document.getElementById("quiz-end");
    let submitButton = document.getElementById("submit-button");
        function endQuiz(){
        quizQuestionEl.classList.add("hidden");
        quizEndEl.classList.remove("hidden");
        let finalScoreEl = document.getElementById("final-score")
        finalScoreEl.textContent = score;
            //input initials and submit
         submitButton.addEventListener("click", getInitials);   
    }
    // hold score date 
    const scoreName = "endscore";
    let initialsEl = document.getElementById("initials");

    function getInitials() {
        if (!initialsEl || initialsEl.value === "") {
            alert("initials please :)");
            return;
        } else {
            let lastHighScore = localStorage.getItem(scoreName);
            let lastHighScoreArray = JSON.parse(lastHighScore);
            if (!lastHighScore || score > lastHighScoreArray[0].newScore) {
                let scoreData = {
                    name: initialsEl.value,
                    newScore: score
                };
                if (!lastHighScoreArray) lastHighScoreArray = [];
                lastHighScoreArray.push(scoreData);
                lastHighScoreArray.sort(function (a, b){
                    return -(a.newScore - b.newScore)
                });
                localStorage.setItem(scoreName, Json.stringify(lastHighScoreArray));
            }
        }
        showResults();
    }
    let highResultEl = document.getElementById("show-result");

    function showResults() {
        quizEndEl.classList.add("hidden");
        highResultEl.classList.remove("hidden");
        let showHighResultEL = document.querySelector("#show-high-result");
        let lastHighScore = localStorage.getItem(scoreName);
        lastHighScoreArray = JSON.parse(lastHighScore);
        if (lastHighScoreArray) {
            showHighResultEL.value = "1." + lastHighScoreArray[0].name + ":" + lastHighScoreArray[0].newScore;
        }
    };

    // clear leader board if wanted and start quiz over
    function clearLocalStorage () {
        document.querySelector("#show-high-result").value = "";
        document.querySelector("#view-high-score").textContent = 0;
        localStorage.clear(lastHighScoreArray);
    }
    function startGameOver() {
        highResultEl.classList.add("hidden");
        startPageel.classList.remove("hidden")
        initialsEl.value = "";
        currentQuestionIndex = 0;
        score = 0
    }

    let startBtn = document.querySelector("#start-button");
    let goBackBtn = document.querySelector("#go-back");
    let clearResultBtn = document.querySelector("#clear-results");
    startBtn.addEventListener("click", countDown);
    goBackBtn.addEventListener("click", startGameOver);
    clearResultBtn.addEventListener("click", clearLocalStorage);
}
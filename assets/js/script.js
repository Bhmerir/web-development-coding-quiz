var timeLeftSpan = document.querySelector("#time-left");
var startPage = document.querySelector("#start");
var questionsPage = document.querySelector("#questions");
var submitPage = document.querySelector("#submit");
var highSorePage = document.querySelector("#high-score");
var body = document.querySelector("body");
var answer = document.querySelector("#answer");
//from page of submit
var result = document.querySelector("#result");
var score = document.querySelector("#score");
//from page of high-score
var hsHeader = document.querySelector("#hs-header");
var initialScore = document.querySelector("#initial-score");
var initialText = document.querySelector("#initial");
var clearBtn = document.querySelector("#clear");
var goBackBtn = document.querySelector("#go-back"); 
var secondLeft = 0;
var currentIndex = 0;
var timeInterval;
var savedScore = {
    initial: "",
    score: 0
}

var questionList = [
    {
        questionNo: 1,
        questionText: "Which of the following choice is Not an immutable variable?",
        options: ["string", "number", "array", "boolean"],
        correctAnswer: 2
    },
    {
        questionNo: 2,
        questionText: "Which property is used to add space around the content area and within the border-box?",
        options: ["padding", "margin", "border", "none of above options"],
        correctAnswer: 0
    },
    {
        questionNo: 3,
        questionText: "Which of the following elements is Not an inline element?",
        options: ["<a>", "<span>", "<div>", "<img>"],
        correctAnswer: 2
    },
    {
        questionNo: 4,
        questionText: "What does the === operator compare?",
        options: ["the type of operands", "the value of operands", "the type and value of operands", "none of the above"],
        correctAnswer: 2
    },
    {
        questionNo: 5,
        questionText: "What does a pop() method in JavaScript do?",
        options: ["delete the last element of an array", "delete the first element of an array", 
                  "add an element at the end of an element", "add an element at the array's start"],
        correctAnswer: 0
    },
    {
        questionNo: 6,
        questionText: "What is the result of 4+5+'7'?",
        options: ["16", "97", "they cannot be added to each other", "none of the above"],
        correctAnswer: 1
    },
    {
        questionNo: 7,
        questionText: "As a default, which one is used to center an element horizentally in a flexbox?",
        options: ["float", "align-items", "text-align", "justify-content"],
        correctAnswer: 3
    },
    {
        questionNo: 8,
        questionText: "Which of the following choice is a position value?",
        options: ["inline", "sticky", "inline-block", "flex"],
        correctAnswer: 1
    },
    {
        questionNo: 9,
        questionText: "Which one is Not a semantic HTML tag?",
        options: ["<div>", "<header>", "<p>", "<main>"],
        correctAnswer: 0
    },
    {
        questionNo: 10,
        questionText: "Which of the following choice is Not define in <head> of an HTML page?",
        options: ["<meta>", "<title>", "<header>", "<link>"],
        correctAnswer: 2
    }
    
    
]

body.addEventListener("click", function(event){
    event.stopPropagation();

    var element = event.target;

    if(element.matches("#start-btn")){
        startQuiz();
    }

    if(element.matches(".list-item")){
        var chosenOptionData = element.getAttribute("data-no");
        var chosenOption = chosenOptionData[0];
        checkAnswer(chosenOption);
    }

    if(element.matches("#submit-btn")){
        submitInitial();
    }

    if(element.matches("#clear")){
        // if user clicks the button of clear high score, the saving record in local storage was deleted
        var scoreHistory = JSON.parse(localStorage.getItem("userScoreStringify"));
        if(scoreHistory !== null){
            localStorage.removeItem("userScoreStringify");
        }
        showHighScore();
    }

    if(element.matches("#go-back")){
        refreshPage();
    }

})

//-------------------------------------------------------------refresh page------------------------------------------------------------------
//This function refreshes the page and bring it to the first page to restart quiz or start to do it for first time
function refreshPage(){
    timeLeftSpan.textContent = "0";
    startPage.setAttribute("style", "z-index: 10;")
    questionsPage.setAttribute("style", "z-index: 1;")
    submitPage.setAttribute("style", "z-index: 1;")
    highSorePage.setAttribute("style", "z-index: 1;")
    currentIndex = 0;
}

//-------------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------set timer----------------------------------------------------------------------
function setTimer(){    
    timeInterval = setInterval(function() {
        secondLeft--;
        timeLeftSpan.textContent = secondLeft;
        //If there is no second left, we stop the timer 
        if(secondLeft === 0){
            clearInterval(timeInterval);
            if(currentIndex != (questionList.length)){
                showResult(false);
            }
            else{
                //If there is no second left, but user have answered all questions, we show all done and ask for inital
                 showResult(true);
            }
        }
    }, 1000);       
}

//-------------------------------------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------start Quiz--------------------------------------------------------------------

function startQuiz(){
    startPage.setAttribute("style", "z-index: 1;")
    questionsPage.setAttribute("style", "z-index: 10;")
    currentIndex = 0;
    timeLeftSpan.textContent = timeLeftSpan.getAttribute("data-max");
    secondLeft = parseInt(timeLeftSpan.textContent);
    setTimer();
    nextQuestions();
}

//------------------------------------------------------------next questions-----------------------------------------------------------------
function nextQuestions(){
    answer.textContent = "";
    var questionText = document.querySelector("#question-text");
    var option1 = document.querySelector("#option1");
    var option2 = document.querySelector("#option2");
    var option3 = document.querySelector("#option3");
    var option4 = document.querySelector("#option4");
    questionText.textContent = questionList[currentIndex].questionNo + ". " + questionList[currentIndex].questionText;
    option1.textContent = questionList[currentIndex].options[0];
    option2.textContent = questionList[currentIndex].options[1];
    option3.textContent = questionList[currentIndex].options[2];
    option4.textContent = questionList[currentIndex].options[3];
}

//-------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------check answer----------------------------------------------------------------------
function checkAnswer(chosenOption){
    if ((parseInt(chosenOption) - 1) === questionList[currentIndex].correctAnswer){
        answer.setAttribute("style", "color: green;");
        answer.textContent = "Correct!👏"
    }
    else{
        answer.setAttribute("style", "color: red;");
        answer.textContent = "Wrong!❌";
        secondLeft -= 15;
        if(secondLeft < 0){
            secondLeft = 0;
            clearInterval(timeInterval);
            timeInterval = null;
            // false means loss
            showResult(false);
        }
        timeLeftSpan.textContent = secondLeft;
    }
    if(currentIndex != questionList.length -1 )
    {
        currentIndex++;
        setTimeout(nextQuestions, 500);
    } 
    else{;
        //When user answered all the questions before time out, we stop counter and how them their score and ask for initial
        clearInterval(timeInterval);
        timeInterval = null;
        score.textContent = secondLeft; 
        // True means win
        showResult(true)

    }
}

//-------------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------show result of quiz------------------------------------------------------------------
/* if user wins (win = true) , the submit page is shown to ask for initial, and 
if they lose, the high score page is shown to show game over*/
function showResult(win){
    if (win){
        score.textContent = secondLeft; 
        questionsPage.setAttribute("style", "z-index: 1;")
        submitPage.setAttribute("style", "z-index: 10;")
        result.textContent = "All Done!";
        initialText.value = "";
    }
    else{               
        questionsPage.setAttribute("style", "z-index: 1;")
        submitPage.setAttribute("style", "z-index: 10;") 
        result.textContent = "Game Over!"; 
        timeLeftSpan.textContent = secondLeft;
        initialText.value = "";
    }
}

//-------------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------submit Initial-----------------------------------------------------------------------
//This function saves the initial and score in local storage and then goes to the page of high score. If no initial is entered, an alert will be shown
function submitInitial(){
    if(initialText.value.trim() !== ""){
        var scoreHistory = JSON.parse(localStorage.getItem("userScoreStringify"));
        if(scoreHistory !== null){
            if(scoreHistory.initial == initialText.value.trim()){
                // If your current score is less than your previous score, this current score won't save
                if(scoreHistory.score < secondLeft){
                    savedScore.initial = initialText.value;
                    savedScore.score = secondLeft;
                    localStorage.setItem("userScoreStringify", JSON.stringify(savedScore));
                }
            }
        }
        else{

            savedScore.initial = initialText.value;
            savedScore.score = secondLeft;
            localStorage.setItem("userScoreStringify", JSON.stringify(savedScore));
        }
        showHighScore();
        submitPage.setAttribute("style", "z-index: 1;")
        highSorePage.setAttribute("style", "z-index: 10;")
    }
    else{
        alert("Please enter your initial!")
    }
}

//---------------------------------------------------show high score-------------------------------------------------------------------------
//This function shows high score if exists in Highscore page
function showHighScore(){
    var scoreHistory = JSON.parse(localStorage.getItem("userScoreStringify"));
    if(scoreHistory !== null){
        savedScore.initial = scoreHistory.initial;
        savedScore.score = scoreHistory.score;
        initialScore.textContent = savedScore.initial + ": " + savedScore.score;
    }
    else{
        initialScore.textContent = " ";
    }
}
//-------------------------------------------------------------------------------------------------------------------------------------------



refreshPage();


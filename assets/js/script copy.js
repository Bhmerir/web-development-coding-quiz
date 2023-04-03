var timeLeftSpan = document.querySelector("#time-left");
var startPage = document.querySelector("#start");
var questionsPage = document.querySelector("#questions");
var submitPage = document.querySelector("#submit");
var highSorePage = document.querySelector("#high-score");
var body = document.querySelector("body");
var answerSec = document.querySelector("#answer-sec");
var secondLeft = 0;
var currentIndex = 0;

var questionList = [
    {
        questionNo: 1,
        questionText: "Which of the following choice is Not an immutable variable?",
        options: ["string", "number", "array", "boolean"],
        correctAnswer: 2
    },
    {
        questionNo: 2,
        questionText: "Which of the following choice is Not an immutable variable?",
        options: ["string", "number", "array", "boolean"],
        correctAnswer: 2
    },
    {
        questionNo: 3,
        questionText: "Which of the following choice is Not an immutable variable?",
        options: ["string", "number", "array", "boolean"],
        correctAnswer: 2
    },
    {
        questionNo: 4,
        questionText: "Which of the following choice is Not an immutable variable?",
        options: ["string", "number", "array", "boolean"],
        correctAnswer: 2
    },
    {
        questionNo: 5,
        questionText: "Which of the following choice is Not an immutable variable?",
        options: ["string", "number", "array", "boolean"],
        correctAnswer: 2
    },
    {
        questionNo: 6,
        questionText: "Which of the following choice is Not an immutable variable?",
        options: ["string", "number", "array", "boolean"],
        correctAnswer: 2
    },
    {
        questionNo: 7,
        questionText: "Which of the following choice is Not an immutable variable?",
        options: ["string", "number", "array", "boolean"],
        correctAnswer: 2
    },
    {
        questionNo: 8,
        questionText: "Which of the following choice is Not an immutable variable?",
        options: ["string", "number", "array", "boolean"],
        correctAnswer: 2
    },
    {
        questionNo: 9,
        questionText: "Which of the following choice is Not an immutable variable?",
        options: ["string", "number", "array", "boolean"],
        correctAnswer: 2
    },
    {
        questionNo: 10,
        questionText: "Which of the following choice is Not an immutable variable?",
        options: ["string", "number", "array", "boolean"],
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
})

//-------------------------------------------------------------refresh page------------------------------------------------------------------
//This function refreshes the page and bring it to the first page to restart quiz or start to do it for first time
function refreshPage(){
    timeLeftSpan.textContent = "0";
    startPage.setAttribute("style", "z-index: 10;")
    questionsPage.setAttribute("style", "z-index: 1;")
    submitPage.setAttribute("style", "z-index: 1;")
    highSorePage.setAttribute("style", "z-index: 1;")
    //As when user becomes game over we change these properties, while refreshing game we have to set them to default
    var hsHeader = document.querySelector("#hs-header");
    var initialScore = document.querySelector("#initial-score");
    var clearBtn = document.querySelector("#clear");
    var goBackBtn = document.querySelector("#go-back");
    hsHeader.setAttribute("style", "font-size: 4rem;");
    initialScore.setAttribute("style", "display: inbox;");
    clearBtn.setAttribute("style", "display: inbox;")
    goBackBtn.setAttribute("style", "margin-left: 0rem;");
    currentIndex = 0;
}

//-------------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------set timer----------------------------------------------------------------------
function setTimer(continueCountDown){
    //from page of submit
    var result = document.querySelector("#result");
    var score = document.querySelector("#score");
    //from page of high-score
    var hsHeader = document.querySelector("#hs-header");
    var initialScore = document.querySelector("#initial-score");
    var clearBtn = document.querySelector("#clear");
    var goBackBtn = document.querySelector("#go-back");
    
    //continueCountDown is true at the start of quiz, and it is false when user answered all the questions before time out
    
    var timeInterval = setInterval(function() {
        secondLeft--;
        timeLeftSpan.textContent = secondLeft;
        //If there is no second left, we stop the timer 
        if(secondLeft === 0){
            clearInterval(timeInterval);
            if(currentIndex < (questionList.length -1)){
                console.log("line:132 ci: "+ currentIndex)
                //If there is no second left, and user haven't answered all questions, it's game over
                questionsPage.setAttribute("style", "z-index: 1;")
                highSorePage.setAttribute("style", "z-index: 10;")
                hsHeader.textContent = "Game Over!"; 
                hsHeader.setAttribute("style", "font-size: 6rem;");
                initialScore.setAttribute("style", "display: none;");
                clearBtn.setAttribute("style", "display: none;");
                goBackBtn.setAttribute("style", "margin-left: 9rem;");
            }
            else{
                //If there is no second left, but user have answered all questions, we show all done and ask for inital
                questionsPage.setAttribute("style", "z-index: 1;")
                submitPage.setAttribute("style", "z-index: 10;")
                result.textContent = "All Done!";
                score.textContent = secondLeft;    
            }
            questionsPage.setAttribute("style", "z-index: 1;")
            submitPage.setAttribute("style", "z-index: 10;")
        } 
        else{
            console.log("line 154: ccd:"+continueCountDown);
            if(continueCountDown  == false){
                console.log("line 156: false")
                //When user answered all the questions before time out, we stop counter and how them their score and ask for initial
                clearInterval(timeInterval);
                score.textContent = secondLeft; 
                questionsPage.setAttribute("style", "z-index: 1;")
                submitPage.setAttribute("style", "z-index: 10;")
                result.textContent = "All Done!";
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
    setTimer(true);
    nextQuestions();
}

//------------------------------------------------------------next questions-----------------------------------------------------------------
function nextQuestions(){
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
    var answer = document.querySelector("#answer");

    if ((parseInt(chosenOption) - 1) === questionList[currentIndex].correctAnswer){
        answerSec.setAttribute("style", "display: flex;")
        answer.setAttribute("style", "color: green;");
        answer.textContent = "Correct!👏"
    }
    else{
        answerSec.setAttribute("style", "display: flex;")
        answer.setAttribute("style", "color: red;");
        answer.textContent = "Wrong!❌";
        secondLeft -= 5;
        if(secondLeft < 0){
            secondLeft = 0;
            setTimer(false);
        }
        timeLeftSpan.textContent = secondLeft;
    }
    answerSec.setAttribute("style", "display: flex;") 
    currentIndex++;
    console.log("line 221"+currentIndex + " "+questionList.length)
    if(currentIndex == questionList.length)
    {
        console.log("line:220 ci: "+ currentIndex)
        setTimer(false);
    }
    else{
        answerSec.setAttribute("style", "display: none;")
        nextQuestions();
    } 
}

//-------------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------set timer----------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------------------------------------


refreshPage();
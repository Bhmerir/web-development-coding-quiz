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
var clearBtn = document.querySelector("#clear");
var goBackBtn = document.querySelector("#go-back"); 
var secondLeft = 0;
var currentIndex = 0;
var timeInterval;

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
function setTimer(){    
    timeInterval = setInterval(function() {
        secondLeft--;
        timeLeftSpan.textContent = secondLeft;
        //If there is no second left, we stop the timer 
        if(secondLeft === 0){
            clearInterval(timeInterval);
            console.log("136: "+currentIndex + " "+ questionList.length)
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
        secondLeft -= 5;
        if(secondLeft < 0){
            console.log("else: line 219: "+secondLeft)
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
        nextQuestions();
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
    }
    else{                
        questionsPage.setAttribute("style", "z-index: 1;")
        highSorePage.setAttribute("style", "z-index: 10;")
        hsHeader.textContent = "Game Over!"; 
        hsHeader.setAttribute("style", "font-size: 6rem;");
        initialScore.setAttribute("style", "display: none;");
        clearBtn.setAttribute("style", "display: none;");
        goBackBtn.setAttribute("style", "margin-left: 9rem;");

    }
}

//-------------------------------------------------------------------------------------------------------------------------------------------


refreshPage();
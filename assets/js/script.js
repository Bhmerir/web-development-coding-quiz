var timeLeftSpan = document.querySelector("#time-left");
var startPage = document.querySelector("#start");
var questionsPage = document.querySelector("#questions");
var submitPage = document.querySelector("#submit");
var highSorePage = document.querySelector("#high-score");
var body = document.querySelector("body");
var secondLeft = 0;
var questionNo = 10;

body.addEventListener("click", function(event){
    event.stopPropagation();

    var element = event.target;

    if(element.matches("#start-btn")){
        startQuiz();
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
    if(continueCountDown){
        var timeInterval = setInterval(function() {
            secondLeft--;
            timeLeftSpan.textContent = secondLeft;
            //If there is no second left, we stop the timer 
            if(secondLeft === 0){
                clearInterval(timeInterval);
                if(questionNo > 0){
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
        }, 1000);
    }
    else{
        //When user answered all the questions before time out, we stop counter and how them their score and ask for initial
        clearInterval(timeInterval);
        questionsPage.setAttribute("style", "z-index: 1;")
        submitPage.setAttribute("style", "z-index: 10;")
        result.textContent = "All Done!";
        score.textContent = secondLeft; 
    }
    console.log(secondLeft);
}

//-------------------------------------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------start Quiz--------------------------------------------------------------------

function startQuiz(){
    startPage.setAttribute("style", "z-index: 1;")
    questionsPage.setAttribute("style", "z-index: 10;")
    timeLeftSpan.textContent = timeLeftSpan.getAttribute("data-max");
    secondLeft = parseInt(timeLeftSpan.textContent);
    setTimer(true);
}

//------------------------------------------------------------set timer----------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------set timer----------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------set timer----------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------------------------------------


refreshPage();
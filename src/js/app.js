 const quizQuestions = [
    {
    description: "Question 1 of 9",
    question: "what is the capital of england",
    options: ["oslo","københagen","paris", "london"],
    correctAnswer: 3,
    },
    {
     description: "Question 2 of 9",   
    question: "what is 3 times 3",
    options: [9,18,12, 6],
    correctAnswer: 0,
    },
    {
     description: "Question 3 of 9",
    question: "what does html stand for",
    options: ["history toool of making language","hydro markup language","hypertext markup language", "hypertext markup logistic"],
    correctAnswer: 2,
    },
    {
     description: "Question 4 of 9",    
    question: "how many days did the inventor of javascript use to create the first javascript program ",
    options: [10, 90, 350, 300],
    correctAnswer: 0,
    },
    {
     description: "Question 5 of 9",    
    question: "when did chatgpt first been released",
    options: ["30 november 2022","30 oktober 2022","30 desember 2022", "30 august 2022"],
    correctAnswer: 0,
    },
    {
    description: "Question 6 of 9",    
    question: "what is the capital of england",
    options: ["oslo","københagen","paris", "london"],
    correctAnswer: 3,
    },
    {
    description: "Question 7 of 9",    
    question: "what does scm stand for in logistic",
    options: ["supply-chain management","supply-chain movement","source-chain movement", "source-colliding movie"],
    correctAnswer: 0,
    },
    {
     description: "Question 8 of 9",
    question: "when did the constition of norway been declared",
    options: [1614,1714,1814, 1914],
    correctAnswer: 2,
    },
    {
    description: "Question 9 of 9",
    question: "which country did karl-maxs origin come from ",
    options: ["england","turkey","france", "germany"],
    correctAnswer: 3,
    }

 ]

// starting the quiz at first quistion and letting the array follow through
let currentQuestionsstart = 0;

const questionContainer = document.querySelector(".task-main__container-description");
const optionsContainer = document.querySelector(".task-main__container-questions")
const quizStartSection = document.querySelector( ".task-main__quizstart");
const quizMainContainer = document.querySelector(".task-main__container")
const startButton = document.querySelector(".task-main__quizstart-button-start")
const navigationButtonPrevious = document.querySelector(".task-main__buttons-previous");
const navigationButtonNext = document.querySelector(".task-main__buttons-next")


// creating so that only the startbutton is displayed first and then quize page starts
startButton.addEventListener("click", () => {
    quizStartSection.classList.add ("hidden");
    quizStartSection.classList.remove("active");
    quizMainContainer.classList.remove("hidden");
    navigationButtonNext.classList.remove("hidden");
    navigationButtonNext.classList.add("active");
    navigationButtonPrevious.classList.add("active");
    progressBarItems.classList.remove("hidden");
    progressBarItems.classList.addd("active");

    loadingQuestion (quizQuestions);
 

});

function toPreviousquestion () {
    if (currentQuestionsstart > 0){
        currentQuestionsstart--;
    }
    loadingQuestion ();
    updatingProgressbar();
}
function toNextQuestion () {
    if (currentQuestionsstart < quizQuestions.length -1){
        currentQuestionsstart ++;
        loadingQuestion();
        
    }
    else{
     result ();
    }
}

navigationButtonNext.addEventListener("click", toNextQuestion)
navigationButtonPrevious.addEventListener("click", toPreviousquestion)



// creating the display for the answer and creating the display for the buttons
function loadingQuestion() {
    optionsContainer.innerHTML = "";
    const currentQuestion = quizQuestions[currentQuestionsstart];
    questionContainer.textContent = currentQuestion.question;
    const descriptionTitle = document.querySelector(".task-main__container-title");
    descriptionTitle.textContent = currentQuestion.description;
    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.textContent = option;
        li.classList.add("task-main__container-questions-options");
        li.addEventListener("click", () => handleAnswer(index));
        optionsContainer.appendChild(li);
    });
}
//  tracking the answers 


let userAnswer= [];

function handleAnswer(selectedIndex) {
    const currentQuestion = quizQuestions[currentQuestionsstart];
    
    userAnswer[currentQuestionsstart] = {
        description: currentQuestion.description,
        question: currentQuestion.question,
        selectedAnswer: currentQuestion.options[selectedIndex],
        correctAnswer: currentQuestion.options [currentQuestion.correctAnswer],
        isCorrectanswer: selectedIndex === currentQuestion.correctAnswer,
    };
    currentQuestionsstart++;
    
    if (currentQuestionsstart < quizQuestions.length) {
        loadingQuestion();  
    } else {
        result (); 
    }
}


function result () {
    // attacking the website 
    const mainContainer = document.querySelector(".task-main")
    // emptying the page
    mainContainer.innerHTML = "";
    //  creating the result page
    const resultTitle = document.createElement ("h2");
    resultTitle.textContent = "quiz-score";
    mainContainer.appendChild(resultTitle)
    
    userAnswer.forEach((answer,index) => {
        const questionElement = document.createElement("p")
        //  added "." that chatgpt suggested because in the score display it was no adaption
        questionElement.textContent = (index + 1) + "."+ answer.question;
        mainContainer.appendChild(questionElement); 
        
        // displaying the user selected answers, so the user can see what they have asnwered
        const useranswerElement = document.createElement ("p");
        useranswerElement.textContent = "your answer" + answer.selectedAnswer;
        mainContainer.appendChild(useranswerElement);
        
        // displaiyng the correct answers, so the user can see what they got wrong 
        const correctanserElement = document.createElement ("p");
        correctanserElement.textContent = "correct answer" + answer.correctAnswer
        mainContainer.appendChild(correctanserElement)
        
        // filtering the users answer with the correct answer, to show the answer
        
    });
    
    const score = userAnswer.filter( answer => answer.isCorrectanswer).length;
    const scoreElement = document.createElement ("h3"); 
    scoreElement.textContent = " Your Score" +  score + "/" + quizQuestions.length;
    mainContainer.appendChild(scoreElement); 
    
}

loadingQuestion()



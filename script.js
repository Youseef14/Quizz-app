
const questions = [
    {
        question: "Which is largest animal in the world ?",
        answers:[
            {text: "Blue Whale", correct: true},
            {text: "Fin Whale", correct: false},
            {text: "Humpback Whale", correct: false},
            {text: "Sperm Whale", correct: false}
        ]
    },
    {
        question: "What is the capital of France ?",
        answers:[
            {text: "Berlin", correct: false},
            {text: "Paris", correct: true},
            {text: "London", correct: false},
            {text: "Madrid", correct: false}
        ]
    },
    {
        question: "What is the largest planet in our solar system ?",
        answers:[
            {text: "Earth", correct: false},
            {text: "Saturn", correct: false},
            {text: "Jupiter", correct: true},
            {text: "Uranus", correct: false}
        ]
    },
    {
        question: "What is the largest living structure on Earth ?",
        answers:[
            {text: "The Great Barrier Reef", correct: true},
            {text: "The Amazon Rainforest", correct: false},
            {text: "The Grand Canyon", correct: false},
            {text: "The Great Wall of China", correct: false}
        ]
    },
]
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButtonsElement = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex =0;
    score = 0;
    nextButtonsElement.innerHTML="Next"
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.dataset.correct = answer.correct;
        answerButtonsElement.appendChild(button);
        button.addEventListener("click", selectAnswer);
    });

};



function resetState() {
    nextButtonsElement.style.display ="none"
   while(answerButtonsElement.firstChild){
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
   }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect =selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;

    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        }else{
            button.classList.add("incorrect");
        }
        button.disabled= true;
    });
    nextButtonsElement.style.display ="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML =`your score ${score} out of ${questions.length}!`
    nextButtonsElement.innerHTML ="play again";
    nextButtonsElement.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex <questions.length){
        showQuestion();
    }else{
        showScore();
    }
}




nextButtonsElement.addEventListener("click" , ()=> {
    if(currentQuestionIndex< questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

    startQuiz();




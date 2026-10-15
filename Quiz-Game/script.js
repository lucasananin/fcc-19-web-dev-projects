// DOM Elements

const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-btn");
const quizScreen = document.getElementById("quiz-screen");
const questionText = document.getElementById("question-text");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const answersContainer = document.getElementById("answers-container");
const progressBar = document.getElementById("progress");
const resultScreen = document.getElementById("result-screen");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");

// Quiz Questions
const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", isCorrect: false },
            { text: "Berlin", isCorrect: false },
            { text: "Paris", isCorrect: true },
            { text: "Madrid", isCorrect: false },
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", isCorrect: false },
            { text: "Mars", isCorrect: true },
            { text: "Jupiter", isCorrect: false },
            { text: "Saturn", isCorrect: false },
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", isCorrect: false },
            { text: "Indian Ocean", isCorrect: false },
            { text: "Arctic Ocean", isCorrect: false },
            { text: "Pacific Ocean", isCorrect: true },
        ]
    },
    {
        question: "Which of these is NOT a programming language?",
        answers: [
            { text: "Java", isCorrect: false },
            { text: "Python", isCorrect: false },
            { text: "Banana", isCorrect: true },
            { text: "JavaScript", isCorrect: false },
        ]
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Go", isCorrect: false },
            { text: "Gd", isCorrect: false },
            { text: "Au", isCorrect: true },
            { text: "Ag", isCorrect: false },
        ]
    },
];

// Quiz State variables;
let currentQuestionIndex = 0;
let score = 0;
let areAnswersDisabled = false;

// totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event Listeners;
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    showQuestion();
}

function showQuestion() {
    areAnswersDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    totalQuestionsSpan.textContent = quizQuestions.length;
    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    answersContainer.innerHTML = "";
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.isCorrect = answer.isCorrect;
        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    if (areAnswersDisabled) return;
    areAnswersDisabled = true;

    const selectedButton = event.target;

    Array.from(answersContainer.children).forEach((button) => {
        if (button.dataset.isCorrect === "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });

    const isCorrect = selectedButton.dataset.isCorrect === "true";
    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;

        if (currentQuestionIndex >= quizQuestions.length) {
            showResults();
        } else {
            showQuestion();
        }
    }, 1000);
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;
    maxScoreSpan.textContent = quizQuestions.length;

    var scorePercentage = (score / quizQuestions.length) * 100;

    if (scorePercentage === 100) {
        resultMessage.textContent = "Perfect!"
    } else if (scorePercentage >= 70) {
        resultMessage.textContent = "Good."
    } else if (scorePercentage >= 40) {
        resultMessage.textContent = "Mediocre."
    } else {
        resultMessage.textContent = "Bad!"
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");
    startQuiz();
}
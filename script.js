const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Saturn", correct: false },
            { text: "Mars", correct: false },
        ]
    },
    {
        question: "What is the smallest country in the world?",
        answers: [
            { text: "Monaco", correct: false },
            { text: "Vatican City", correct: true },
            { text: "Nauru", correct: false },
            { text: "San Marino", correct: false },
        ]
    },
    {
        question: "What is the longest river in the world?",
        answers: [
            { text: "Amazon River", correct: true },
            { text: "Nile River", correct: false },
            { text: "Yangtze River", correct: false },
            { text: "Mississippi River", correct: false },
        ]
    },
    {
        question: "What is the capital of Australia?",
        answers: [
            { text: "Sydney", correct: false },
            { text: "Melbourne", correct: false },
            { text: "Canberra", correct: true },
            { text: "Brisbane", correct: false },
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
        ]
    },
    {
        question: "What is the capital of Japan?",
        answers: [
            { text: "Kyoto", correct: false },
            { text: "Tokyo", correct: true },
            { text: "Osaka", correct: false },
            { text: "Hiroshima", correct: false },
        ]
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        answers: [
            { text: "Oxygen", correct: false },
            { text: "Carbon Dioxide", correct: true },
            { text: "Nitrogen", correct: false },
            { text: "Hydrogen", correct: false },
        ]
    },
    {
        question: "What is the chemical symbol for Gold?",
        answers: [
            { text: "Au", correct: true },
            { text: "Ag", correct: false },
            { text: "Pb", correct: false },
            { text: "Fe", correct: false },
        ]
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answers: [
            { text: "Gold", correct: false },
            { text: "Iron", correct: false },
            { text: "Diamond", correct: true },
            { text: "Quartz", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(button, answer.correct));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none"; // Hide Next button initially
    answerButtonsElement.innerHTML = ""; // Clear previous answer buttons
}

function selectAnswer(button, isCorrect) {
    // Disable all buttons to prevent multiple clicks
    Array.from(answerButtonsElement.children).forEach(btn => btn.disabled = true);

    if (isCorrect) {
        button.classList.add("correct");
        score++; // Increase score if correct
    } else {
        button.classList.add("incorrect");
    }

    // Show the correct answer in green
    Array.from(answerButtonsElement.children).forEach(btn => {
        if (questions[currentQuestionIndex].answers.find(a => a.text === btn.innerText).correct) {
            btn.classList.add("correct");
        }
    });

    nextButton.style.display = "block"; // Show Next button after selecting an answer
}

function handleNextButton() {
    currentQuestionIndex++; // Move to the next question
    if (currentQuestionIndex < questions.length) {
        showQuestion(); // Show next question
    } else {
        showScore(); // Show final score when quiz is over
    }
}

function showScore() {
    resetState();
    questionElement.innerText = `Quiz Finished! Your score: ${score}/${questions.length}`;
    nextButton.innerText = "Restart";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
}

nextButton.addEventListener("click", handleNextButton);

// Start the quiz on page load
startQuiz();
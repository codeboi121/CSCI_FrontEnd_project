
var correctAnswers = 0;
var wrongAnswers = 0;
var count = 0;
var numberOfQuestions = 0;
var operations = [];
var timer = null;
var timerSeconds = 0;
var timeUsed = 0;

function generateRandomNumbers(from, to) {
    let num1 = Math.floor(Math.random() * (to - from + 1)) + from;
    let num2 = Math.floor(Math.random() * (to - from + 1)) + from;
    return [num1, num2];
}

function generateProblem() {
    let [num1, num2] = generateRandomNumbers(
        parseInt(document.getElementById('rangeFrom').value),
        parseInt(document.getElementById('rangeTo').value)
    );

    let operation = operations[Math.floor(Math.random() * operations.length)];
    let question = { num1, num2, operation };

    if (operation === "add") {
        question.answer = num1 + num2;
        question.symbol = "+";
    } else if (operation === "sub") {
        question.answer = num1 - num2;
        question.symbol = "-";
    } else if (operation === "mul") {
        question.answer = num1 * num2;
        question.symbol = "*";
    } else if (operation === "div") {
        question.answer = (num2 === 0 ? 0 : Math.floor(num1 / num2));
        question.symbol = "/";
    }

    document.getElementById("num1").textContent = num1;
    document.getElementById("num2").textContent = num2;
    document.getElementById("symbol").textContent = question.symbol;
    return question;
}

function startQuiz() {
    // Reset stats
    correctAnswers = 0;
    wrongAnswers = 0;
    count = 0;
    timeUsed = 0;

    // Get user settings
    numberOfQuestions = parseInt(document.getElementById("numberOfQuestions").value);
    operations = [];
    if (document.getElementById("add_operation").checked) operations.push("add");
    if (document.getElementById("sub_operation").checked) operations.push("sub");
    if (document.getElementById("mul_operation").checked) operations.push("mul");
    if (document.getElementById("div_operation").checked) operations.push("div");

    if (document.getElementById("timerOption").checked) {
        timerSeconds = parseInt(document.getElementById("timerSeconds").value);
        startTimer();
    }

    // Show questionary, hide settings
    document.getElementById("settings").hidden = true;
    document.getElementById("questionary").hidden = false;

    // Generate first problem
    currentProblem = generateProblem();
}

function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("userAnswer").value);
    if (userAnswer === currentProblem.answer) {
        correctAnswers++;
    } else {
        wrongAnswers++;
    }

    count++;
    if (count < numberOfQuestions) {
        currentProblem = generateProblem();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    document.getElementById("questionary").hidden = true;
    document.getElementById("result").hidden = false;

    document.getElementById("correctAnswers").textContent = correctAnswers;
    document.getElementById("wrongAnswers").textContent = wrongAnswers;
    document.getElementById("percentage").textContent =
        ((correctAnswers / numberOfQuestions) * 100).toFixed(2) + "%";
}

function startTimer() {
    if (timer) clearInterval(timer);

    timer = setInterval(() => {
        timerSeconds--;
        document.getElementById("timerDisplay").textContent = timerSeconds + "s";
        timeUsed++;
        if (timerSeconds <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

document.getElementById("startQuestions").addEventListener("click", startQuiz);
document.getElementById("checkAnswer").addEventListener("click", checkAnswer);

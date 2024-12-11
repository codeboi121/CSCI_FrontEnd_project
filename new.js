var correctAnswers = 0;
var wrongAnswers = 0;
var randoms = [];
var correct = 0;
var wrong = 0;
var count = 0;
var numberOfQuestions=0;

function generateRandomNumbers(from, to)
{
	let num1 = Math.ceil(Math.random() * to) + from;
	let num2 = Math.ceil(Math.random() * to) + from;

	// set on DOM
	document.getElementById('num1').textContent = num1;
	document.getElementById('num2').textContent = num2;

	return [num1, num2];
}

function checkAnswer(){
	
	let answer = parseInt(document.getElementById('userAnswer').value);

	if((randoms[0]+randoms[1]) == answer)
	{
		correct++;
		document.getElementById('correct').textContent = correct;
		document.getElementById('checkAnswer').removeEventListener('click', checkAnswer);
	}
	else
	{
		wrong++;
		document.getElementById('wrong').textContent = wrong;
		document.getElementById('checkAnswer').removeEventListener('click', checkAnswer);
	}
}

function callNextProblem()
{
	randoms = generateRandomNumbers(-5, 10);
	document.getElementById('userAnswer').value = '';
	count++;

	document.getElementById('checkAnswer').addEventListener('click', checkAnswer);

	if(count >= numberOfQuestions)
		document.getElementById('nextProblem').removeEventListener('click', callNextProblem)
}

document.addEventListener("DOMContentLoaded", function() {
	correctAnswers = 0;
	wrongAnswers = 0;
	numberOfQuestions = 5;
	randoms = [];
	count = 0;

	document.getElementById('correct').textContent = '0';
	document.getElementById('wrong').textContent = '0';

	document.getElementById('nextProblem').addEventListener('click', callNextProblem)

})

let inputTitle;
let inputImage;
let inputNumberOfQuestions;
let inputNumberOfLevels;
const questionStorage = [];
const levelStorage = [];
const questions = document.querySelector('.fabio section:nth-child(2)');
const levels = document.querySelector('.fabio section:nth-child(3)');
const levelTitles = [];
const levelMins = [];
const levelUrls = [];
const levelDescription = [];
let allLevelTitles;
const mainLucas = document.querySelector('.lucas');
const mainFabio = document.querySelector('.fabio');
let userQuizzes = [];
let userQuizzesString;
let quizzAtual;

function openCreateQuizz() {
	mainLucas.classList.add('hide');
	mainFabio.classList.remove('hide');
}

function createQuizz() {
	const informations = document.querySelector('.fabio section');
	inputTitle = document.querySelector('.fabio .quizz-information input').value;
	inputImage = document.querySelector(
		'.fabio .quizz-information input:nth-child(2)'
	).value;
	inputNumberOfQuestions = Number(
		document.querySelector('.fabio .quizz-information input:nth-child(3)').value
	);
	inputNumberOfLevels = Number(
		document.querySelector('.fabio .quizz-information input:nth-child(4)').value
	);
	informations.classList.add('hide');
	informations.classList.remove('informations');
	questions.classList.remove('hide');
	questions.classList.add('questions');
	createQuestions();
}

function createQuestions() {
	let boxQuestions = document.querySelector('.fabio .question-box');

	for (let i = 0; i < inputNumberOfQuestions; i++) {
		boxQuestions.innerHTML += `
      <div class="question">
        <div class="header">
            <p>Pergunta ${i + 1}</p>
            <ion-icon onclick="expandQuestion(this)" name="create-outline"></ion-icon>
        </div>
        <input type="text" class="question-title" minlength="20" required title="minimo de 20 letras" placeholder="Texto da pergunta">
        <input type="text" class="question-color" pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{6})$" required title="começar em #, seguida de 6 caracteres hexadecimais, ou seja, números ou letras de A a F" placeholder="Cor de fundo da pergunta">
        <p>Resposta correta</p>
        <input type="text" class="correct-answer" required placeholder="Resposta correta">
        <input type="url" class="question-url-correct" required placeholder="URL da imagem">
        <p>Respostas incorretas</p>
        <input type="text" class="wrong-answer1" required placeholder="Resposta incorreta 1">
        <input type="url" class="question-url1" required placeholder="URL da imagem 1">
        <br> <br>
        <input type="text" class="wrong-answer2" placeholder="Resposta incorreta 2">
        <input type="url" class="question-url2" placeholder="URL da imagem 2">
        <br> <br>
        <input type="text" class="wrong-answer3" placeholder="Resposta incorreta 3">
        <input type="url" class="question-url3" placeholder="URL da imagem 3">
      </div>
    `;
	}
}

function expandQuestion(req) {
	const selected = document.querySelector('.selected');
	const question = req.parentNode.parentNode;
	if (selected) {
		selected.classList.remove('selected');
		question.classList.add('selected');
	} else {
		question.classList.add('selected');
	}
}

function createLevels() {
	const allCorrectAnswers = document.querySelectorAll('.fabio .correct-answer');
	const allWrongAnswers1 = document.querySelectorAll('.fabio .wrong-answer1');
	const allWrongAnswers2 = document.querySelectorAll('.fabio .wrong-answer2');
	const allWrongAnswers3 = document.querySelectorAll('.fabio .wrong-answer3');
	const allQuestionColors = document.querySelectorAll('.fabio .question-color');
	const allQuestionTitles = document.querySelectorAll('.fabio .question-title');
	const allQuestionUrlsCorrects = document.querySelectorAll(
		'.fabio .question-url-correct'
	);
	const allQuestionUrls1 = document.querySelectorAll('.fabio .question-url1');
	const allQuestionUrls2 = document.querySelectorAll('.fabio .question-url2');
	const allQuestionUrls3 = document.querySelectorAll('.fabio .question-url3');

	for (let i = 0; i < allCorrectAnswers.length; i++) {
		const title = allQuestionTitles[i].value;
		const color = allQuestionColors[i].value;
		const correct = allCorrectAnswers[i].value;
		const urlCorrect = allQuestionUrlsCorrects[i].value;
		const wrong1 = allWrongAnswers1[i].value;
		const wrong2 = allWrongAnswers2[i].value;
		const wrong3 = allWrongAnswers3[i].value;
		const url1 = allQuestionUrls1[i].value;
		const url2 = allQuestionUrls2[i].value;
		const url3 = allQuestionUrls3[i].value;

		questionStorage.push({
			title: title,
			color: color,
			answers: [
				{
					text: correct,
					image: urlCorrect,
					isCorrectAnswer: true,
				},
				{
					text: wrong1,
					image: url1,
					isCorrectAnswer: false,
				},
			],
		});

		if (wrong2 !== '' && wrong3 === '') {
			questionStorage[i].answers.push({
				text: wrong2,
				image: url2,
				isCorrectAnswer: false,
			});
		} else if (wrong2 !== '' && wrong3 !== '') {
			questionStorage[i].answers.push(
				{
					text: wrong2,
					image: url2,
					isCorrectAnswer: false,
				},
				{
					text: wrong3,
					image: url3,
					isCorrectAnswer: false,
				}
			);
		}
	}
	questions.classList.add('hide');
	questions.classList.remove('questions');
	levels.classList.remove('hide');
	levels.classList.add('levels');
	renderLevels();
}

function renderLevels() {
	const boxLevels = document.querySelector('.fabio .level-box');
	for (let i = 1; i < inputNumberOfLevels; i++) {
		boxLevels.innerHTML += `
      <div class="level">
        <div class="header">
            <p>Nivel ${i + 1}</p>
            <ion-icon onclick="expandQuestion(this)" name="create-outline"></ion-icon>
        </div>
        <input type="text" class="level-title" minlength="10" required title="minimo de 10 letras" placeholder="Título do nível">
        <input type="number" class="level-min" min="0" max="100" required placeholder="% de acerto mínima">
        <input type="url" class="level-url" required placeholder="URL da imagem do nível">
        <input type="text" class="level-description" minlength="30" required title="minimo de 30 letras" placeholder="Descrição do nível">
      </div>
    `;
	}
}

function finishQuizz() {
	const allLevelMins = document.querySelectorAll('.fabio .level-min');
	const allLevelUrls = document.querySelectorAll('.fabio .level-url');
	const allLevelDescriptions = document.querySelectorAll(
		'.fabio .level-description'
	);
	allLevelTitles = document.querySelectorAll('.fabio .level-title');
	for (let i = 0; i < allLevelTitles.length; i++) {
		levelTitles.push(allLevelTitles[i].value);
		levelMins.push(allLevelMins[i].value);
		levelUrls.push(allLevelUrls[i].value);
		levelDescription.push(allLevelDescriptions[i].value);
	}

	const sucess = document.querySelector('.fabio section:nth-child(4)');
	levelObjectCreate();
	postQuizz();
	levels.classList.add('hide');
	levels.classList.remove('levels');
	sucess.classList.remove('hide');
	sucess.classList.add('sucess');
	renderSucess();
}

function renderSucess() {
	const boxSucess = document.querySelector('.fabio .sucess-box');
	boxSucess.innerHTML = `
    <div class="quizz">
      <div class="gradient"></div>
      <img src="${inputImage}" alt="">
      <p>${inputTitle}</p>
    </div>
  `;
}

function hideButtonCreateQuizz() {
	const userQuizzes = document.querySelector('.lucas .userQuizzes .quizzes');
	const userQuizzesButton = document.querySelector('.lucas .userQuizzes');
	const createQuizzButton = document.querySelector('.lucas .createQuizz');
	if (userQuizzes.innerHTML !== '') {
		createQuizzButton.classList.add('hide');
	} else {
		userQuizzesButton.classList.add('hide');
	}
}

hideButtonCreateQuizz();

function levelObjectCreate() {
	for (let i = 0; i < allLevelTitles.length; i++) {
		levelStorage.push({
			title: levelTitles[i],
			image: levelUrls[i],
			text: levelDescription[i],
			minValue: levelMins[i],
		});
	}
}

function postQuizz() {
	const objectQuizzCreate = {
		title: inputTitle,
		image: inputImage,
		questions: questionStorage,
		levels: levelStorage,
	};

	const promise = axios.post(
		'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes',
		objectQuizzCreate
	);

	promise.catch((err) => console.log(err));
	promise.then((res) => {
		quizzAtual = res.data;
		if (localStorage.length === 0) {
			userQuizzes.push(res.data);
			userQuizzesString = JSON.stringify(userQuizzes);
			localStorage.setItem('userQuizzes', userQuizzesString);
		} else {
			const arrayAux = JSON.parse(localStorage.getItem('userQuizzes'));
			arrayAux.push(res.data);
			userQuizzesString = JSON.stringify(arrayAux);
			localStorage.setItem('userQuizzes', userQuizzesString);
		}
	});
}

function accessQuizz() {
	axios
		.get(
			`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzAtual.id}`
		)
		.then((r) => {
			goodresp(r);
			showScreen2();
			renderTitle();
			renderQuestions();
		});
}

function backHome() {
	location.reload(true);
}

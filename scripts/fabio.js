let inputTitle;
let inputImage;
let inputNumberOfQuestions;
let inputNumberOfLevels;
const questionStorage = [];
const levelStorage = [];
const questions = document.querySelector('.fabio section:nth-child(2)');
const levels = document.querySelector('.fabio section:nth-child(3)');
const correctAnswers = [];
const wrongAnswers = [];
const questionTitles = [];
const questionColors = [];
const questionUrls = [];
const levelTitles = [];
const levelMins = [];
const levelUrls = [];
const levelDescription = [];
const allLevelTitles = document.querySelectorAll('.fabio .level-title');

//Criando objeto de quizz para salvar em local storage
let quizzToStorage = {}

function openCreateQuizz() {
	const mainLucas = document.querySelector('.lucas');
	mainLucas.classList.add('hide');
	const mainFabio = document.querySelector('.fabio');
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
	//começarndo a setar variaveis do objeto
	
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
        <input type="url" class="question-url" required placeholder="URL da imagem">
        <p>Respostas incorretas</p>
        <input type="text" class="wrong-answer" required placeholder="Resposta incorreta 1">
        <input type="url" class="question-url" required placeholder="URL da imagem 1">
        <br> <br>
        <input type="text" class="wrong-answer" placeholder="Resposta incorreta 2">
        <input type="url" class="question-url" placeholder="URL da imagem 2">
        <br> <br>
        <input type="text" class="wrong-answer" placeholder="Resposta incorreta 3">
        <input type="url" class="question-url" placeholder="URL da imagem 3">
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
	const allWrongAnswers = document.querySelectorAll('.fabio .wrong-answer');
	const allQuestionColors = document.querySelectorAll('.fabio .question-color');
	const allQuestionTitles = document.querySelectorAll('.fabio .question-title');
	const allQuestionUrls = document.querySelectorAll('.fabio .question-url');
	for (let i = 0; i < allCorrectAnswers.length; i++) {
		correctAnswers.push(allCorrectAnswers[i].value);
		questionTitles.push(allQuestionTitles[i].value);
		questionColors.push(allQuestionColors[i].value);
	}
	for (let i = 0; i < allWrongAnswers.length; i++) {
		if (allWrongAnswers[i].value !== '') {
			wrongAnswers.push(allWrongAnswers[i].value);
		}
	}
	for (let i = 0; i < allQuestionUrls.length; i++) {
		if (allQuestionUrls[i].value !== '') {
			questionUrls.push(allQuestionUrls[i].value);
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
	for (let i = 0; i < allLevelTitles.length; i++) {
		levelTitles.push(allLevelTitles[i].value);
		levelMins.push(allLevelMins[i].value);
		levelUrls.push(allLevelUrls[i].value);
		levelDescription.push(allLevelDescriptions[i].value);
	}

	const sucess = document.querySelector('.fabio section:nth-child(4)');
	// levelObjectCreate();
	// postQuizz()
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

// function levelObjectCreate() {
// 	for (let i = 0; i < allLevelTitles.length; i++) {
// 		levelStorage.push({
// 			title: levelTitles[i],
// 			image: levelUrls[i],
// 			text: levelDescription[i],
// 			minValue: levelMins[i]
// 		})
// 	}
// }

// function postQuizz() {
// 	const promise = axios.post(
// 		'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes',
// 		{
// 			title: inputTitle,
// 			image: inputImage,
// 			questions: [
// 				{
// 					title: questionTitles[0],
// 					color: questionColors[0],
// 					answers: [
// 						{
// 							text: correctAnswers[0],
// 							image: questionUrls[0],
// 							isCorrectAnswer: true,
// 						},
// 						{
// 							text: wrongAnswers[0],
// 							image: questionUrls[1],
// 							isCorrectAnswer: false,
// 						},
// 					],
// 				},
// 				{
// 					title: questionTitles[1],
// 					color: questionColors[1],
// 					answers: [
// 						{
// 							text: correctAnswers[1],
// 							image: questionUrls[2],
// 							isCorrectAnswer: true,
// 						},
// 						{
// 							text: wrongAnswers[1],
// 							image: questionUrls[3],
// 							isCorrectAnswer: false,
// 						},
// 					],
// 				},
// 				{
// 					title: questionTitles[2],
// 					color: questionColors[2],
// 					answers: [
// 						{
// 							text: correctAnswers[2],
// 							image: questionUrls[4],
// 							isCorrectAnswer: true,
// 						},
// 						{
// 							text: wrongAnswers[2],
// 							image: questionUrls[5],
// 							isCorrectAnswer: false,
// 						},
// 					],
// 				},
// 			],
// 			levels: levelStorage
// 		}
// 	);

// 	promise.then(() => console.log('Deu certo'))
// }
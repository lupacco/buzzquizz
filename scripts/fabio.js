let inputTitle;
let inputImage;
let inputNumberOfQuestions;
let inputNumberOfLevels;
const questionsStorage = [];
const levelsStorage = [];
const questions = document.querySelector('.fabio section:nth-child(2)');
const levels = document.querySelector('.fabio section:nth-child(3)');

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
        <input type="text" placeholder="Texto da pergunta">
        <input type="text" placeholder="Cor de fundo da pergunta">
        <p>Resposta correta</p>
        <input type="text" class="answer" placeholder="Resposta correta">
        <input type="text" class="url" placeholder="URL da imagem">
        <p>Respostas incorretas</p>
        <input type="text" class="answer" placeholder="Resposta incorreta 1">
        <input type="text" class="url" placeholder="URL da imagem 1">
        <br> <br>
        <input type="text" class="answer" placeholder="Resposta incorreta 2">
        <input type="text" class="url" placeholder="URL da imagem 2">
        <br> <br>
        <input type="text" class="answer" placeholder="Resposta incorreta 3">
        <input type="text" class="url" placeholder="URL da imagem 3">
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
	questions.classList.add('hide');
	questions.classList.remove('questions');
	levels.classList.remove('hide');
	levels.classList.add('levels');
	renderLevels();
}

function renderLevels() {
	const boxLevels = document.querySelector('.fabio .level-box');
	for (let i = 0; i < inputNumberOfLevels; i++) {
		boxLevels.innerHTML += `
      <div class="level">
        <div class="header">
            <p>Nivel ${i + 1}</p>
            <ion-icon onclick="expandQuestion(this)" name="create-outline"></ion-icon>
        </div>
        <input type="text" minlength="10" required title="minimo de 10 letras" placeholder="Título do nível">
        <input type="number" min="0" max="100" required placeholder="% de acerto mínima">
        <input type="url" required placeholder="URL da imagem do nível">
        <input type="text" minlength="30" required title="minimo de 30 letras" placeholder="Descrição do nível">
      </div>
    `;
	}
}

function finishQuizz() {
	const sucess = document.querySelector('.fabio section:nth-child(4)');
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
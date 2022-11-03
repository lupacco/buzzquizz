let inputTitle;
let inputImage;
let inputNumberOfQuestions;
let inputNumberOfLevels;
const questionsStorage = []
const levelsStorage = []

function openCreateQuizz() {
  const mainLucas = document.querySelector('.lucas')
  mainLucas.classList.add('hide')
  const mainFabio = document.querySelector('.fabio')
  mainFabio.classList.remove('hide')
}

function createQuizz() {
  const informations = document.querySelector('.fabio section')
  const questions = document.querySelector('.fabio section:nth-child(2)')
  inputTitle = document.querySelector('.fabio .quizz-information input').value
  inputImage = document.querySelector('.fabio .quizz-information input:nth-child(2)').value
  inputNumberOfQuestions = Number(document.querySelector('.fabio .quizz-information input:nth-child(3)').value)
  inputNumberOfLevels = Number(document.querySelector('.fabio .quizz-information input:nth-child(4)').value)
  if (inputTitle.length >= 20 && inputTitle.length <= 65 && inputNumberOfQuestions >= 3 && inputNumberOfQuestions <= 5 && inputNumberOfLevels >= 2 && inputNumberOfLevels <= 4 && !inputImage.indexOf('https://')) {
    informations.classList.add('hide')
    informations.classList.remove('informations')
    questions.classList.remove('hide')
    questions.classList.add('questions')
    createQuestions()
  } else {
    alert('Preencha os dados corretamente por favor')
  }
}

function createQuestions() {
  const boxQuestions = document.querySelector('.fabio .question-box')
  for(let i = 0; i < inputNumberOfQuestions; i++) {
    boxQuestions.innerHTML += `
      <div class="question">
        <div class="header">
            <p>Pergunta ${i + 1}</p>
            <ion-icon onclick="expandQuestion(this)" name="create-outline"></ion-icon>
        </div>
        <input type="text" placeholder="Texto da pergunta">
        <input type="text" placeholder="Cor de fundo da pergunta">
        <p>Resposta correta</p>
        <input type="text" placeholder="Resposta correta">
        <input type="text" placeholder="URL da imagem">
        <p>Respostas incorretas</p>
        <input type="text" placeholder="Resposta incorreta 1">
        <input type="text" placeholder="URL da imagem 1">
        <br> <br>
        <input type="text" placeholder="Resposta incorreta 2">
        <input type="text" placeholder="URL da imagem 2">
        <br> <br>
        <input type="text" placeholder="Resposta incorreta 3">
        <input type="text" placeholder="URL da imagem 3">
      </div>
    `
  }
}

function expandQuestion(req) {
  const selected = document.querySelector('.selected')
  const question = req.parentNode.parentNode
  if(selected) {
    selected.classList.remove('selected')
    question.classList.add('selected')
  } else {
    question.classList.add('selected')
  }
}

function createLevels() {

}
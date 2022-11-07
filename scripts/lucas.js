/**
 * @brief Buzz Quizz - Lucas Pagotto C. Oliveira - 23/10/22
 *        Driven Turma 9 - Fourth week of the full-stack course
 */ 

let objects;
function getQuizzes(){
    axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
    .then(quizzes => {
        objects = quizzes.data
        renderUserQuizzes(quizzes.data)
        renderQuizzes(quizzes.data)
    })
}
//Renderiza quizzes do usuário
function renderUserQuizzes(quizzes){
    //Resgata div que contém os quizzes criados pelo usuário
    let userQuizzesDiv = document.querySelector('.userQuizzes .quizzes')
    //Resgata objetos salvos em localstorage em formato de string
    //Ainda falta salvar os quizzes criados em uma variável/array com esse nome
    console.log(objects)
    //console.log('resgtando')
    let localQuizzes = JSON.parse(localStorage.getItem('userQuizzes'))
    //console.log('resgatou')
    //console.log(localQuizzes)
    

}
//Renderiza todos os quizzes
function renderQuizzes(quizzes){
    //Resgata div que contém todos os quizes
    let allQuizzes = document.querySelector('.allQuizzes .quizzes')
    //guarda um array com todos os quizzes (usado em selectQuizz())
    quizzes.forEach(quiz => {
        allQuizzes.innerHTML += `
        <div class="quizz" onclick="selectQuizz(this)">
            <div class="gradient"></div>
            <img src="${quiz.image}" alt="">
            <p>${quiz.title}</p>
        </div>
        `
    });
    let renderedQuizzes = Array.from(allQuizzes.querySelectorAll('.quizz'))
    //console.log(renderedQuizzes)

}   

getQuizzes()
/**
 * @brief Buzz Quizz - Lucas Pagotto C. Oliveira - 23/10/22
 *        Driven Turma 9 - Fourth week of the full-stack course
 */ 

let objects;
function getQuizzes(){
    axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
    .then(quizzes => {
        renderUserQuizzes(quizzes.data)
        renderQuizzes(quizzes.data)
    })
}
let Quizz;
//Renderiza quizzes do usuário
function renderUserQuizzes(){
    //Resgata objetos salvos em localstorage em formato de string e transforma em JSON
    let localQuizzes = JSON.parse(localStorage.getItem('userQuizzes'))
    //console.log(localQuizzes)
    //Resgata div que contém os quizzes criados pelo usuário
    let userQuizzesDiv = document.querySelector('.userQuizzes .quizzes')
    //Percorre cada objeto-quizz do localStorage
    localQuizzes.forEach(quiz => {
        userQuizzesDiv.innerHTML += `
        <div class="quizz" id="${quiz.id}" onclick="selectUserQuizz(this)">
            <div class="gradient"></div>
            <img src="${quiz.image}" alt="">
            <p>${quiz.title}</p>
        </div>
        `
    })
}

//Renderiza todos os quizzes
function renderQuizzes(quizzes){
    Quizz = quizzes
    //console.log(Quizz[0].id)
    //Resgata div que contém todos os quizes
    let allQuizzes = document.querySelector('.allQuizzes .quizzes')
    quizzes.forEach(quiz => {
        allQuizzes.innerHTML += `
        <div class="quizz" onclick="selectQuizz(this)">
        <div class="gradient"></div>
        <img src="${quiz.image}" alt="">
        <p>${quiz.title}</p>
        </div>
        `
    });
}   

getQuizzes()
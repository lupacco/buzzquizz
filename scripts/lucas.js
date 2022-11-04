/**
 * @brief BUzz Quizz - Lucas Pagotto C. Oliveira - 23/10/22
 *        Driven Turma 9 - Fourth week of the full-stack course
 */ 

function hideCreateDiv(){
    item = document.querySelector('.createQuizz')
    item.classList.toggle('hide')
}

function getQuizzes(){
    axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
    .then(quizzes => {
        renderQuizzes(quizzes.data)
    })
}
let Quizz;
function renderQuizzes(quizzes){
    let allQuizzes = document.querySelector('.allQuizzes .quizzes')
    Quizz = quizzes;
    console.log(Quizz)
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
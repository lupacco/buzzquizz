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

function renderQuizzes(quizzes){
    let allQuizzes = document.querySelector('.allQuizzes .quizzes')
    console.log(quizzes)
    quizzes.forEach(quiz => {
        allQuizzes.innerHTML += `
        <div class="quizz">
            <div class="gradient"></div>
            <img src="${quiz.image}" alt="">
            <p>${quiz.id}</p>
        </div>
        `
        //trocar quiz.id por quiz.title
    });
    let renderedQuizzes = Array.from(allQuizzes.querySelectorAll('.quizz'))
    console.log(renderedQuizzes)

}   

getQuizzes()
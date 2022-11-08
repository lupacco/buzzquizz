/**
 * @brief Buzz Quizz - Lucas Pagotto C. Oliveira - 23/10/22
 *        Driven Turma 9 - Fourth week of the full-stack course
 */ 
let testQuizz;
function getQuizzes(){
    axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
    .then(quizzes => {
        testQuizz = quizzes.data
        renderUserQuizzes(quizzes.data)
        renderQuizzes(quizzes.data)
        // console.log(testQuizz[0])
        // let testString = JSON.stringify(testQuizz[0])
        // localStorage.setItem('userQuizzes', testString)
    })
}
let Quizz;
//Renderiza quizzes do usuário
function renderUserQuizzes(){
    //Resgata objetos salvos em localstorage em formato de string e transforma em JSON
    let localQuizzes = JSON.parse(localStorage.getItem('userQuizzes'))
    if(localQuizzes != null && localQuizzes.length > 0){
        //Resgata div que contém os quizzes criados pelo usuário
        let userQuizzesDiv = document.querySelector('.userQuizzes .quizzes')
        //Percorre cada objeto-quizz do localStorage
        if(!localQuizzes) return
        localQuizzes.forEach(quiz => {
            userQuizzesDiv.innerHTML += `
            <div class="quizz" id="${quiz.id}" onclick="selectUserQuizz(this)">
                <div class="gradient"></div>
                <img src="${quiz.image}" alt="">
                <div class="quizzOption">
                    <ion-icon name="create-outline"></ion-icon>
                    <ion-icon onclick="deleteQuizz(this)" name="trash-outline"></ion-icon>
                </div>
                <p>${quiz.title}</p>
            </div>
            `
        })
    }
}

//Deleta quiz
function deleteQuizz(quiz){
    //Resgata quizzes de usuário
    let localQuizzes = JSON.parse(localStorage.getItem('userQuizzes'))
    //Resgata div quizz que envolve todo o conteúdo de apresentação do quiz
    let parentDiv = quiz.parentNode.parentNode
    let parentDivId = parentDiv.id
    //Percorre cada elemento salvo pra saber qual excluir
    for(i in localQuizzes){
        if(localQuizzes[i].id == parentDivId){
            delete localQuizzes[i]
            localQuizzes.shift()
        }
    }
    localQuizzes = JSON.stringify(localQuizzes)
    localStorage.setItem('userQuizzes', localQuizzes)
}
//Renderiza todos os quizzes
function renderQuizzes(quizzes){
    Quizz = quizzes
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
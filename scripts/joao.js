let position;
let click = 0;
let score = 0;
let a =[];
let result;
let idToBeRendered;

function selectUserQuizz(element){
    console.log(element)
    click = 0;
    score = 0;
    window.scrollTo(0, 0);
    let quizzList = document.querySelectorAll(".userQuizzes .quizzes .quizz");

    for (let i = 0; i<quizzList.length; i++){
        if(element === quizzList[i]){
            idToBeRendered = element.id
        }
    }
    catchingId();
}

function selectQuizz(element){
    console.log(element)
    click = 0;
    score = 0;
    window.scrollTo(0, 0);
    let quizzList = document.querySelectorAll(".allQuizzes .quizzes .quizz");

    for (let i = 0; i<quizzList.length; i++){
        if(element === quizzList[i]){
            position = i;
        }
    }
    idToBeRendered = Quizz[position].id
    catchingId();
}


function catchingId(){
    let promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idToBeRendered}`);
    promise.then(r => {
        goodresp(r)
        showScreen2();
        renderTitle();
        renderQuestions();
    });
}

let returned;
let t;

function goodresp(r){
    returned = r.data;
    console.log('Good response:')
    console.log(returned);
}

function showScreen2(){
    let screen1 = document.querySelector(".lucas");
    let screen3 = document.querySelector(".fabio");
    let screen2 = document.querySelector(".joao");
    screen2.classList.remove("hide");
    screen1.classList.add("hide");
    screen3.classList.add("hide");


}

function renderTitle(){
    let Title = document.querySelector(".joao .quizzQuestions .quizzTitle");
    t = returned.title;
    img = returned.image;
    Title.innerHTML =  `                  
    <img src="${img}">
    <h1>${t}</h1>
`
;
}

function random() { 
	return Math.random() - 0.5; 
}

function renderQuestions(){
    // 1. renderiza titulos de perguntas
    let questions = document.querySelector(".joao .questions");
    questions.innerHTML = "";
    //for para percorrer questions
    for(let i = 0; i < returned.questions.length; i++){
        //segundo for para procurar as answers dentro de questions
        //for(let j = 0; j <returned.questions[i].answers.length; j++){
        questions.innerHTML += `
        <div class="question" id ="${i}">
        <div class="questionTitle" style = "background-color: ${returned.questions[i].color};">
            ${returned.questions[i].title}         
            </div>
        <div class="options"> </div> </div>`

    }
    //2. embaralha as respostas
    for (let i=0; i < returned.questions.length; i++){
        returned.questions[i].answers.sort(random);
    }
    // 3.renderiza as respostas de cada pergunta

    let answers = document.querySelectorAll(".joao .questions .options");
    for (let i = 0; i < answers.length; i++){
        for(let j = 0; j < returned.questions[i].answers.length; j++){
        answers[i].innerHTML = answers[i].innerHTML + 
        `
        <div class="answer" id="${returned.questions[i].answers[j].isCorrectAnswer}" onclick = "ansClick(this)">
                <img src="${returned.questions[i].answers[j].image}">
                <h1>${returned.questions[i].answers[j].text}</h1>
        </div>
        
        `
        }
    }
    catchQuestions();
}

function catchQuestions(){
     a = document.querySelectorAll(".question");
}


function ansClick (element) {
    //1. cliclar em uma resposta
    //2. selecionar a div options daquela resposta
    let o = element.parentNode
    let array = o.querySelectorAll(".answer");
    //3. acinzentar todas as respostas não escolhida
    for (let i = 0 ; i < array.length; i++){
        if(array[i] !== element){
            array[i].classList.add("nonClicked");
        }
    }
    //4. mudar a cor do texto de acordo com true ou false
    for (let i = 0;  i < array.length ; i++){
        if(array[i].id === "true"){
          array[i].classList.add("correctAsw");
        } else{
            array[i].classList.add("wrongAsw");
        }
    }
    //5. cancelar todos onclick
    for (let i = 0; i<array.length; i++){
        array[i].removeAttribute("onclick", "ansClick(this)");
    }
    //6. scrollar para proxima pergunta apos 2 segundos

    //o.nextElementSibling.scrollIntoView();
    //7. score
    if (element.id === "true"){
        score = score + 1;
    }
    click = click + 1;
    if (click === a.length){
        renderEnd()
    }
}

let values = [];
function renderEnd(){
    let endd = document.querySelector(".end");
    endd.classList.remove("hide");
    let r = (score / a.length)*100;
    result = Math.round(r);
    let renderEndTitle = document.querySelector(".endQuiz .endTitle");
    let renderEndMessage = document.querySelector(".endQuiz .endmessage");
    renderEndTitle.innerHTML = "";
    renderEndMessage.innerHTML = "";


    for (let i = 0; i < returned.levels.length; i++){
        let value = returned.levels[i].minValue;
        values.push(value);
    }
    for(let i = 0; i < values.length ; i++){
        if( result >= values[i]){
            renderEndTitle.innerHTML = `
            <h1>${returned.levels[i].title}</h1>
            `;
            renderEndMessage.innerHTML = `
            <img src="${returned.levels[i].image}">
            <p>${returned.levels[i].text}</p>
    
            `
    
        }
    }
}


function home(){
    let screen1 = document.querySelector(".lucas");
    let screen2 = document.querySelector(".joao");
    let screen3 = document.querySelector(".fabio");
    let endScreen = document.querySelector(".end");

    screen1.classList.remove("hide");
    screen2.classList.add("hide");
    screen3.classList.add("hide");
    endScreen.classList.add("hide");
}

function restart(){
    window.scrollTo(0, 0);
    let a = document.querySelectorAll(".answer");
    for(let i = 0; i< a.length; i++){
    if (a[i].id === "true"){
        a[i].classList.remove("correctAsw");
        a[i].classList.remove("nonClicked");

    } else{
        a[i].classList.remove("wrongAsw");
        a[i].classList.remove("nonClicked");

    }

}
for(let i = 0 ; i < a.length ; i++){
    a[i].setAttribute("onclick", "ansClick(this)");
}

let hide = document.querySelector(".end");
hide.classList.add("hide");
click = 0;
score = 0;
}
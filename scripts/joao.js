let quizzList;
let position;


function selectQuizz(element){
    quizzList = document.querySelectorAll(".allQuizzes .quizzes .quizz");

    for (let i = 0; i<quizzList.length; i++){
        if(element === quizzList[i]){
            position = i;
        }
    }
    catchingId();
}


function catchingId(){
    console.log(Quizz[position].id);
    let promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${Quizz[position].id}`);
    promise.then(r => {
        goodresp(r)
        showScreen2();
        renderTitle();
        renderQuestions();
        randomAns();
    });
}

let returned;
let t;

function goodresp(r){
    returned = r.data;
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

//array vazio 
//fazer uma função onde:

//1. pega as respostas de cada i-pergunta 
//2. embaralha as respostas desse i
//3. retorna esse array
//EMBARALHAR RESPOSTAS

//array.sort(random);
//console.log(array);




function renderQuestions(){
    // 1. renderiza titulos de perguntas
    let questions = document.querySelector(".joao .questions");
    questions.innerHTML = "";
    //for para percorrer questions
    for(let i = 0; i < returned.questions.length; i++){
        //segundo for para procurar as answers dentro de questions
        //for(let j = 0; j <returned.questions[i].answers.length; j++){
        questions.innerHTML += `
        <div class="question ${i}">
        <div class="questionTitle" style = "background-color: ${returned.questions[i].color};">
            ${returned.questions[i].title}         
            </div>
        <div class="options"> </div> </div>`

    }
    // 2.renderiza as respostas de cada pergunta
    for (let i=0; i < returned.questions.length; i++){
        returned.questions[i].answers.sort(random);
    }
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
}

//1. clico em uma resposta
//2. verifica cada resposta
//3. muda a cor do seu texto


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
}

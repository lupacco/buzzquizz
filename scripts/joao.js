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
    showScreen2();
    renderTitle();
}


function catchingId(){
    console.log(Quizz[position].id);
    let promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${Quizz[position].id}`);
    promise.then(goodresp);
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

function renderQuestions(){
    let questions = document.querySelector(".joao .questions");
    console.log(questions);
    let ans = [];
    for(let i = 0; i < returnedObj.questions.answers.length; i++){
        ans.push(returnedObj.questions.answers[i]);
    }
    ans.sort(random);
    questions.innerHTML = "";
    for (let i=0; i < returnedObj.questions.length; i++){
        for(let i=0; i < ans.length; i++){
        questions += `
        <div class="question">
        <div class="questionTitle">
            ${returnedObj.questions[i].title}
        </div>
        <div class="options">
            <div class="answer">
                <img src="${returnedObj.questions[i].ans[j].image}">
                <h1>${returnedObj.questions[i].ans[j].text}</h1>
            </div>

            <div class="answer">
                <img src="${returnedObj.questions[i].ans[j].image}">
                <h1>${returnedObj.questions[i].ans[j].text}</h1>
            </div>

            <div class="answer">
                <img src="${returnedObj.questions[i].ans[j].image}">
                <h1>${returnedObj.questions[i].ans[j].text}</h1>
            </div>

            <div class="answer">
                <img src="${returnedObj.questions[i].ans[j].image}">
                <h1>${returnedObj.questions[i].ans[j].text}</h1>
            </div>

        </div>
    </div>

        `
        ;


    }
}


}




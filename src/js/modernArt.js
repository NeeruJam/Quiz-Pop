import myJson from './dataset.json' assert {type: 'json'};
localStorage.setItem("myJson", JSON.stringify(myJson));
const value = localStorage.getItem("myJson");
const data=JSON.parse(value);

const main= document.querySelector('.music, .coding, .modernArt');
const ques=document.querySelector('.ques');
const ans=document.querySelectorAll('.ans');
const ansA=document.querySelector('#A');
const ansB=document.querySelector('#B');
const ansC=document.querySelector('#C');
const ansD=document.querySelector('#D');
const back=document.querySelector('.back');
const next=document.querySelector('.next');
const btnA=document.querySelector('#ansA');
const btnB=document.querySelector('#ansB');
const btnC=document.querySelector('#ansC');
const btnD=document.querySelector('#ansD');


let currentQuiz = 0;
let stored="";
let score = 0;

 ModernArtQuiz()
function ModernArtQuiz() {
  
  deselectAnswers()
  const currentQuizData = data.modernArt[currentQuiz]
  ques.innerHTML = `${currentQuiz+1}: ` + currentQuizData.question
  A.innerText = currentQuizData.options[0]
  B.innerText = currentQuizData.options[1]
  C.innerText = currentQuizData.options[2]
  D.innerText = currentQuizData.options[3]

  if(stored=JSON.parse(localStorage.getItem("attempted")))
  {
  for(let i=0;i<4;i++)
  { if (stored.includes(data.modernArt[currentQuiz].options[i]))
  {
    btnA.disabled= true;
    btnB.disabled= true;
    btnC.disabled= true;
    btnD.disabled= true;
    ans[i].checked=true;
    return;
  }
  else{
  btnA.disabled= false;
  btnB.disabled= false;
  btnC.disabled= false;
  btnD.disabled= false;
  }
  }
}}

function deselectAnswers() {
  ans.forEach(option => option.checked = false)
}

let attempted=[];
function getSelected() {
  let answer
  ans.forEach(option => {
      if(option.checked) {
          if(option.id==="ansA")
          answer= data.modernArt[currentQuiz].options[0];
          if(option.id==="ansB")
          answer= data.modernArt[currentQuiz].options[1];
          if(option.id==="ansC")
          answer= data.modernArt[currentQuiz].options[2];
          if(option.id==="ansD")
          answer= data.modernArt[currentQuiz].options[3];
          attempted.push(answer);
      }
      else{
        return 0;
      }
      localStorage.setItem("attempted", JSON.stringify(attempted)) ;
  })
  return answer
}
next.addEventListener('click', () => {
  const answer = getSelected()
  if(answer!=0) {
    if(answer === data.modernArt[currentQuiz].answer) {
        score++
        currentQuiz++;
    }
   else{
     currentQuiz++;
   }
     if(currentQuiz+1===10){
        next.innerHTML= `Submit Quiz`;
       }
     if(currentQuiz < data.modernArt.length) {
         ModernArtQuiz()
     } else {
         main.innerHTML = `
         <h2>You answered ${score}/${data.modernArt.length} questions correctly</h2>
         `
     }
  }
})

back.addEventListener('click', () => {
      
    if(currentQuiz > 0) {
     currentQuiz--;
        ModernArtQuiz()
    }
 }
)
window.onbeforeunload = function (e) {
  localStorage.clear();
}

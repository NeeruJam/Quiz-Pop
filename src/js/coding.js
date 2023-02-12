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

 CodingQuiz()
function CodingQuiz() {
  
  deselectAnswersC()
  const currentQuizData = data.coding[currentQuiz]
  ques.innerHTML = `${currentQuiz+1}: ` + currentQuizData.question
  A.innerText = currentQuizData.options[0]
  B.innerText = currentQuizData.options[1]
  C.innerText = currentQuizData.options[2]
  D.innerText = currentQuizData.options[3]

  if(stored=JSON.parse(localStorage.getItem("attempted")))
  {
  for(let i=0;i<4;i++)
  { if (stored.includes(data.coding[currentQuiz].options[i]))
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
}
}
function deselectAnswersC() {
  ans.forEach(option => option.checked = false)
}

let attempted=[];
function getSelectedC() {
  let answer
  ans.forEach(option => {
      if(option.checked) {
          if(option.id==="ansA")
          answer= data.coding[currentQuiz].options[0];
          if(option.id==="ansB")
          answer= data.coding[currentQuiz].options[1];
          if(option.id==="ansC")
          answer= data.coding[currentQuiz].options[2];
          if(option.id==="ansD")
          answer= data.coding[currentQuiz].options[3];
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
  const answer = getSelectedC()
  if(answer!=0) {
    if(answer === data.coding[currentQuiz].answer) {
        score++
        currentQuiz++;
    }
   else{
     currentQuiz++;
   }
     if(currentQuiz+1===10){
        next.innerHTML= `Submit Quiz`;
       }
     if(currentQuiz < data.coding.length) {
         CodingQuiz()
     } else {
         main.innerHTML = `
         <h2>You answered ${score}/${data.coding.length} questions correctly</h2>
        
         `
     }
  }
})

back.addEventListener('click', () => {
      
       if(currentQuiz > 0) {
        currentQuiz--;
           CodingQuiz()
       }
    }
  )
  window.onbeforeunload = function (e) {
    localStorage.clear();
  };
  
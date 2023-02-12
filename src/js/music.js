import myJson from '../../dataset.json' assert {type: 'json'};
localStorage.setItem("myJson", JSON.stringify(myJson));
const value = localStorage.getItem("myJson");
const data=JSON.parse(value);


const main= document.querySelector('.music, .coding, .modernArt');
const ques=document.querySelector('.ques');
const ans=document.querySelectorAll('.ans');
const back=document.querySelector('.back');
const next=document.querySelector('.next');
const btnA=document.querySelector('#ansA');
const btnB=document.querySelector('#ansB');
const btnC=document.querySelector('#ansC');
const btnD=document.querySelector('#ansD');


let currentQuiz = 0;
let score = 0;
let stored="";

let num=localStorage.getItem("attempted");
MusicQuiz()
function MusicQuiz() {
   
    deselectAnswersM()
    const currentQuizData = data.music[currentQuiz]
    ques.innerHTML = `${currentQuiz+1}: ` + currentQuizData.question
    A.innerText = currentQuizData.options[0]
    B.innerText = currentQuizData.options[1]
    C.innerText = currentQuizData.options[2]
    D.innerText = currentQuizData.options[3]
    
    if(stored=JSON.parse(localStorage.getItem("attempted")))
    {
    for(let i=0;i<4;i++)
    { if (stored.includes(data.music[currentQuiz].options[i]))
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

next.addEventListener('click', () => {
  
  const answer = getSelectedM()
  
  
  if(answer!=0) {
     if(answer === data.music[currentQuiz].answer) {
         score++
         currentQuiz++;
     }
    else{
      currentQuiz++;
    }
    
     if(currentQuiz+1===10){
      next.innerHTML= `Submit Quiz`;
     }
     if(currentQuiz < data.music.length) {
      
       MusicQuiz()
     } else {
         main.innerHTML = `<h2>You answered ${score}/${data.music.length} questions correctly</h2> `
          
          

          
        }
        
     }
  })


let attempted=[];

function deselectAnswersM() {
  ans.forEach(option => option.checked = false)
          
}
function getSelectedM() {
  
  let answer;
  ans.forEach(option => {
      if(option.checked) {
          if(option.id==="ansA")
          answer= data.music[currentQuiz].options[0];
          if(option.id==="ansB")
          answer= data.music[currentQuiz].options[1];
          if(option.id==="ansC")
          answer= data.music[currentQuiz].options[2];
          if(option.id==="ansD")
          answer= data.music[currentQuiz].options[3];
          attempted.push(answer);
      }
      else{
        return 0;
      }
      localStorage.setItem("attempted", JSON.stringify(attempted)) ;
      
  }) 
  
  return answer
}
back.addEventListener('click', () => {
  
  if(currentQuiz > 0) {
   currentQuiz--;
      MusicQuiz()
  }
  
}
)

window.onbeforeunload = function (e) {
  localStorage.clear("attempted");
 };

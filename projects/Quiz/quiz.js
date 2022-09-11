const QData = [
    {
        q: '2+2=',
        a: '4',
        b: '5',
        c: '6',
        d: '7',
        correct: 'a'
    },
    {
        q: '2+3=',
        a: '1',
        b: '5',
        c: '6',
        d: '7',
        correct: 'b'
    },
    {
        q: '1+5=',
        a: '4',
        b: '1',
        c: '6',
        d: '7',
        correct: 'c'
    },
    {
        q: '4+3=',
        a: '4',
        b: '5',
        c: '6',
        d: '7',
        correct: 'd'
    },
    {
        q: '3+4=',
        a: '4',
        b: '6',
        c: '5',
        d: '7',
        correct: 'd'
    }
];

const q = document.getElementById("question");
const a = document.getElementById("a").nextElementSibling;
const b = document.getElementById("b").nextElementSibling;
const c = document.getElementById("c").nextElementSibling;
const d = document.getElementById("d").nextElementSibling;
const labels = document.querySelectorAll('label');
const answers = document.querySelectorAll('input[name="answers"]');
const btn= document.getElementById("submit");
var currentq = 0;
var score = 0;
var check;
loadquiz();

function start(){
    check = 0;
    answers.forEach((answer) => {
        if(answer.checked){
            check = 1;
        }
    });
    checker();
}

function loadquiz(){
    q.innerHTML = QData[currentq].q;
    a.innerHTML = QData[currentq].a;
    b.innerHTML = QData[currentq].b;
    c.innerHTML = QData[currentq].c;
    d.innerHTML = QData[currentq].d;
}

function checker(){
    if(check == 1){
       let x = document.querySelector('input[name="answers"]:checked').value;

       if(x == QData[currentq].correct){
        score++;
        document.querySelector('input[name="answers"]:checked').nextElementSibling.style.color = 'green';
       } else {
        document.querySelector('input[name="answers"]:checked').nextElementSibling.style.color = 'red';
        document.getElementById(QData[currentq].correct).nextElementSibling.style.color = 'green';
       }

       if(currentq == QData.length - 1){
           setTimeout(result, 1000);
       } else {
        setTimeout(reset, 900);
        setTimeout(loadquiz, 1000);
        currentq++;
       }
    } else {
        alert("please, choose answer");
    }
}

function result(){
    alert('RESULT: ' + score);
    btn.disabled = true;
    btn.style.backgroundColor = 'grey';
}

function reset(){
    for (let i of labels){
        i.style.color = "black";
    }
    document.querySelector('input[name="answers"]:checked').checked = false;
}
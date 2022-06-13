const outpass = document.getElementById("outpass");
const upper = document.getElementById("upper");
const lower = document.getElementById("lower");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const btn = document.getElementById("generate");

const up = 'QWERTYUIOPASDFGHJKLZXCVBNM';
const low = 'qwertyuiopasdfghjklzxcvbnm';
const symbol = '/*-+@#$%&_';

btn.addEventListener("click", () => {
    var choose = [];
    if(upper.checked) choose.push('up');
    if(lower.checked) choose.push('low');
    if(numbers.checked) choose.push('number');
    if(symbols.checked) choose.push('symbol');
    if(choose.length == 0 || choose == undefined){
        alert("Please, check at least one box");
    } else {
        var pass = '';
        outpass.value = '';
        const paslength = document.getElementById("length").value;

        while(paslength > pass.length){
            var r = Math.floor(Math.random()*4);

            if(choose[r] == 'number'){
                r = Math.floor(Math.random()*10);
                pass += r;
            } else if(choose[r] == 'up'){
                r = Math.floor(Math.random()*up.length);
                pass += up[r];
            } else if(choose[r] == 'low'){
                r = Math.floor(Math.random()*low.length);
                pass += low[r];
            } else if(choose[r] == 'symbol'){
                r = Math.floor(Math.random()*symbol.length);
                pass += symbol[r];
            }
        }
        outpass.value = pass;
    }
});

function copy(){
    var copyText = document.getElementById("outpass");

    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
    navigator.clipboard.writeText(copyText.value);
}
var mybutton = document.getElementById("topbutton");
window.onscroll = function() {appearButton()};

function appearButton(){
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
        mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
}

function topScroll(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

var tabs = document.querySelectorAll('.navbartabs');
var sections = document.querySelectorAll('.sections');

function switcher(x){
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    sections.forEach(section => {
        section.classList.add('hide');
    });

    document.getElementById(`${x}_tab`).classList.add('active');
    document.getElementById(x).classList.remove('hide');
}
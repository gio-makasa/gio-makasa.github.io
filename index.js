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
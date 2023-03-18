const expandImg = document.getElementById("expandedImg");

function myFunction(imgs) {
    expandImg.parentElement.style.display = "block";
    expandImg.src = imgs.src;
}

/*city switcher starts*/
var mydata = JSON.parse(tours);

const header = document.getElementById("header");
const title = document.getElementById("title");
const text = document.getElementById("text");
const img1 = document.getElementById("img_1");
const img2 = document.getElementById("img_2");
const img3 = document.getElementById("img_3");
const img4 = document.getElementById("img_4");

switcher(0);

function switcher(n){
    header.style.backgroundImage = `URL('${mydata[n].background}')`;
    title.innerHTML = mydata[n].h1;
    text.innerHTML = mydata[n].p;
    img1.src = mydata[n].link1;
    img2.src = mydata[n].link2;
    img3.src = mydata[n].link3;
    img4.src = mydata[n].link4;
    expandImg.parentElement.style.display = "none";
}
/*city switcher ends*/
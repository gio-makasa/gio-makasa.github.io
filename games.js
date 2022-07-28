var mydata = JSON.parse(quote);
var R = Math.floor(Math.random()*mydata.length);

document.getElementById("q").innerHTML = `"${mydata[R].q}"`;
document.getElementById("a").innerHTML = `- ${mydata[R].a}`;
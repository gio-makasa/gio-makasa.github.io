$('[lang="ka"]').hide();
$('#switch_lang').click(function(){
	$('[lang="en"]').toggle();
	$('[lang="ka"]').toggle();
});


//adding hard skills
const hardskill = JSON.parse(hardskills);
var id = 0;
hardskill.forEach(element => {
	let skill = `
		<div class="border" style="--clr1:${element.clr1}; --clr2:${element.clr2}">
            <div class="frame">
                <h2 class="title">${element.s}</h2>
                <div class="circle" style="--clr:${element.clr1};">
                    <svg>
                        <circle cx="70" cy="70" r="70"></circle>
                        <circle cx="70" cy="70" r="70" id="${id}"></circle>
                    </svg>
                    <div class="level">${element.l}%</div>
                </div>
            </div>
        </div>
`;

$('#hardskills').append(skill);

$('#'+id).css("strokeDashoffset", 440 - (440 * element.l)/100);
id++;
});


//adding soft skills
const softskill = JSON.parse(softskills);
softskill.forEach(element => {
    let skill = `
    <p>${element}
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    </p>
    `

    $('#softskills').append(skill);
});


//adding quote
const myquote = JSON.parse(quote);
var R = Math.floor(Math.random()*myquote.length);

$('#q').html(`"${myquote[R].q}"`);
$('#a').html(`- ${myquote[R].a}`);

//Games and Projects
const mygames = JSON.parse(games);
const myprojects = JSON.parse(projects);

mygames.forEach(game => {
    let c1 = Math.floor(Math.random()*255);
    let c2 = Math.floor(Math.random()*255);
    let c3 = Math.floor(Math.random()*255);
    let clr = `rgb(${c1},${c2},${c3})`;

    let $div =`
    <div class="frames" style="--clr:${clr}">
        <div class="frame">
            <div class="front">
                <h2>${game.t}</h2>
            </div>
            <div class="back">
                <a href="${game.l}">
                    <img src="${game.p}" alt="${game.t}">
                </a>
            </div>
        </div>
    </div>
    `;

    $('#games').append($div);
});

myprojects.forEach(project => {
    let c1 = Math.floor(Math.random()*255);
    let c2 = Math.floor(Math.random()*255);
    let c3 = Math.floor(Math.random()*255);
    let clr = `rgb(${c1},${c2},${c3})`;

    let $div =`
    <div class="frames" style="--clr:${clr}">
        <div class="frame">
            <div class="front">
                <h2>${project.t}</h2>
            </div>
            <div class="back">
                <a href="${project.l}">
                    <img src="${project.p}" alt="${project.t}">
                </a>
            </div>
        </div>
    </div>
    `;

    $('#projects').append($div);
});

//right line
let check_point = $('.nav-link');

for(let i of check_point){
  i = i.href.split('#')[1];
  let distance = Math.round($('#'+i).position().top / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100);
  $(`[href='#${i}']`).css("top", distance+"%");
}

window.onscroll = () => {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;

  for(let i of check_point){
    i = i.href.split('#')[1];
    let distance = Math.round($('#'+i).position().top / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100);
    if(scrolled >= distance){
        $(`[href='#${i}']`).css("background-color", "red");
    } else {
        $(`[href='#${i}']`).css("background-color", "rgba(80, 0, 0, 0.8)");
    }
  }

  $('#myBar').css('height',scrolled+'%');
}
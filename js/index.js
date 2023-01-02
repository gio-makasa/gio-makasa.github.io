import myquote from "./json/quotes.json" assert {type: 'json'};
import hardskill from "./json/hardskills.json" assert {type: 'json'};
import softskill from "./json/softskills.json" assert {type: 'json'};
import mygames from "./json/games.json" assert {type: 'json'};
import myprojects from "./json/projects.json" assert {type: 'json'};

//adding quote
var R = Math.floor(Math.random()*myquote.length);
$('#q').html(`"${myquote[R].q}"`);
$('#a').html(`- ${myquote[R].a}`);

//adding hard skills
var id = 0;
hardskill.forEach(element => {
	let skill = `
		<div class="border" style="--clr1:${element.clr1}; --clr2:${element.clr2}">
            <div class="frame">
                <h2 class="title">${element.s}</h2>
                <div class="circle" style="--clr:${element.clr1};">
                    <svg>
                        <circle cx="50%" cy="50%" r="50"></circle>
                        <circle cx="50%" cy="50%" r="50" id="${id}"></circle>
                    </svg>
                    <div class="level">${element.l}%</div>
                </div>
            </div>
        </div>
`;

$('#hardskills').append(skill);

$('#'+id).css("strokeDashoffset", 314 - (314 * element.l)/100);
id++;
});

//adding soft skills
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

//adding Games
mygames.forEach(game => {
    let c1 = Math.floor(Math.random()*255);
    let c2 = Math.floor(Math.random()*255);
    let c3 = Math.floor(Math.random()*255);
    let clr = `rgb(${c1},${c2},${c3})`;

    let $div =`
    <div class="frames padd-15" onclick="" style="--clr:${clr}">
        <div class="sides">
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

//adding Projects
myprojects.forEach(project => {
    let c1 = Math.floor(Math.random()*255);
    let c2 = Math.floor(Math.random()*255);
    let c3 = Math.floor(Math.random()*255);
    let clr = `rgb(${c1},${c2},${c3})`;

    let $div =`
    <div class="frames padd-15" onclick="" style="--clr:${clr}">
        <div class="sides">
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
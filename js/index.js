// //adding quote
const myquote = JSON.parse(quotes);
var R = Math.floor(Math.random()*myquote.length);

$('#q').html(`"${myquote[R].q}"`);
$('#a').html(`- ${myquote[R].a}`);

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

//Games and Projects
const mygames = JSON.parse(games);

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

const myprojects = JSON.parse(projects);

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
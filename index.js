// scroll to top button
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

//hard_soft skills switcher
const hard = document.getElementById('hard_skills');
const soft = document.getElementById('soft_skills');
const changer = document.getElementById('switcher');

changer.addEventListener('click', () =>{
    if(changer.checked){
        soft.style.display = 'flex';
        hard.style.display = 'none';
    } else {
        soft.style.display = 'none';
        hard.style.display = 'flex';
    }
});

//get skills from JSON
const myhardskills = JSON.parse(hardskills);
const mysoftskills = JSON.parse(softskills);

myhardskills.forEach(skill => {
    const star = document.createElement('i');
    star.className += 'fa-solid fa-star';
    star.style.color = 'blue';

    const level = document.createElement('span');
    level.className += 'level';
    for(let i = 0; i < skill.l; i++){
        level.appendChild(star.cloneNode(true));
    }

    star.style.color = 'white';
    for(let i = 0; i < 5 - skill.l; i++){
        level.appendChild(star.cloneNode(true));
    }
    var skill_p = document.createElement('p');
    skill_p.className += 'skill';
    skill_p.innerText = skill.s;
    skill_p.appendChild(level);
    hard.appendChild(skill_p);
});

mysoftskills.forEach(skill => {
    soft.innerHTML += `<p>${skill}</p>`;
});

//switch between tabs
const navList = document.querySelectorAll('.navbartabs');
const sections = document.querySelectorAll('.sections');

//get quotes from JSON
const myquote = JSON.parse(quote);

navList.forEach(nav => {
    nav.addEventListener('click', () => {
        navList.forEach(nav => {
            nav.classList.remove('active');
        });

        sections.forEach(section => {
            if(section.id == nav.innerHTML){
                section.classList.remove('hide');
            } else {
                section.classList.add('hide');
            }
        });

        nav.classList.add('active');
        
        /*change quotes starts*/
        if(nav.innerHTML == 'games'){
            var R = Math.floor(Math.random()*myquote.length);
            
            document.getElementById("q").innerHTML = `"${myquote[R].q}"`;
            document.getElementById("a").innerHTML = `- ${myquote[R].a}`;
        }
        /*change quotes ends*/
    })
});
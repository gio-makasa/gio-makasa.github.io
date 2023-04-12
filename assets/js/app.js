async function getData(url) {
    const response = await fetch(url);
    return response.json();
}

const info = await getData('./assets/js/json/info.json');
const quotes = await getData('./assets/js/json/quotes.json');

const startup = document.querySelector('#startUp');
const header = document.querySelector('header');
const main = document.querySelector('main');
const fullname = document.querySelector('#fullname');
const avatar = document.querySelector('#avatar');
const shortInfo = document.querySelector('#shortInfo');
const fields = document.querySelector('#fields');
const dayPart = document.querySelector('#dayPart');
const socialLinks = document.querySelector('#socialLinks');
const quote = document.querySelector('#quote');
const author = document.querySelector('#author');
const hoursNow = new Date().getHours();
const aboutMeInfo = document.querySelector('#aboutMeInfo');
const aboutDetails = document.querySelector('#aboutDetails');
const educationContainer = document.querySelector('#educationContainer');
const experienceContainer = document.querySelector('#experienceContainer');
const skills = document.querySelector('#skills');
const liveProjects = document.querySelector('#liveProjects');
const personalProjects = document.querySelector('#personalProjects');
const games = document.querySelector('#games');

setTimeout(() => {
    header.classList.remove('hide');
    main.classList.remove('hide');
    startup.classList.add('hide');
}, 3000);

getHomeInfo();
getAboutInfo();
getHarkskills();
getProjects();

function getHomeInfo() {
    fullname.innerText = info.fullname;
    avatar.src = info.avatarPhoto;
    shortInfo.innerText = info.shortInfo;

    info.fields.forEach(field => {
        fields.innerHTML += `<p>${field}</p>`;
    });

    if (hoursNow >= 6 && hoursNow < 12) {
        dayPart.innerText = 'morning';
    } else if (hoursNow >= 12 && hoursNow < 17) {
        dayPart.innerText = 'afternoon';
    } else if (hoursNow >= 17 && hoursNow < 22) {
        dayPart.innerText = 'evening';
    } else if (hoursNow >= 22 || hoursNow < 6) {
        dayPart.innerText = 'night';
    }

    for (let [key, value] of Object.entries(info.socials)) {
        socialLinks.innerHTML += `
        <a href="${value}">
            <img src="./assets/images/socials/${key}.png" alt="${key}">
        </a>
        `;
    }

    getQuote();
}

function getQuote() {
    let r = Math.floor(Math.random() * quotes.length);
    quote.innerText = quotes[r].q;
    author.innerText = quotes[r].a;
}

function getAboutInfo() {
    aboutMeInfo.innerText = info.aboutme;
    let div = document.createElement('div');

    for (let [index, [key, value]] of Object.entries(Object.entries(info.aboutDetails))) {
        if (key == 'age') {
            value = (new Date().getFullYear()) - (new Date(info.aboutDetails.birthday).getFullYear());
        }

        div.innerHTML += `<h4>${key}:</h4> <p>${value}</p>`;
        aboutDetails.appendChild(div.cloneNode(true));
        div.innerHTML = '';
    }

    info.education.forEach(education => {
        let div = document.createElement('div');
        div.classList.add('education');

        div.innerHTML = `
        <span><i class="fa-solid fa-calendar-days"></i> ${education.years}</span>
        <h2>${education.title}</h2>
        <p>${education.info}</p>`
        educationContainer.appendChild(div);
    });

    info.experience.forEach(experience => {
        let div = document.createElement('div');
        div.classList.add('experience');

        div.innerHTML = `
        <span><i class="fa-solid fa-calendar-days"></i> ${experience.years}</span>
        <h2>${experience.title}</h2>
        <p>${experience.info}</p>`
        experienceContainer.appendChild(div);
    });
}

function getHarkskills() {
    let hardskills = document.createElement('div');
    hardskills.classList.add('hardskills');

    info.hardskills.forEach(hardskill => {
        hardskills.innerHTML += `
        <div class="hardskill" style="--clr1:${hardskill.color1}; --clr2:${hardskill.color2}">
        <h3>${hardskill.skill}</h3>
        </div>
        `;
    });

    skills.appendChild(hardskills);


    let softskills = document.createElement('div');
    softskills.classList.add('softskills');

    info.softskills.forEach(softskill => {
        softskills.innerHTML += `
        <div class="softskill">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <h3>${softskill}</h3>
        </div>
        `;
    });

    skills.appendChild(softskills);
}

function getProjects() {
    randFrames(liveProjects, info.liveProjects);
    randFrames(personalProjects, info.personalProjects);
    randFrames(games, info.games);
}

function randFrames(where, array) {
    array.forEach(project => {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);

        let rgb = `rgb(${r},${g},${b})`;

        let teches = '<div class="techs">';

        project.teches.forEach(tech => {
            teches += `<p>${tech}</p>`
        });

        teches += '</div>'

        where.innerHTML += `
            <div class="frames" style="--rgbcolor:${rgb}">
                <a href="${project.l}">
                    <img src="${project.p}" alt="${project.t}">
                </a>
                <h2>${project.t}</h2>
                ${teches}
            </div>
        `
    });
}

$(document).ready(function () {
    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });
});
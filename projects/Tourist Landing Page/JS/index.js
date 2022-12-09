const service = document.createElement('div');
service.classList.add('service');
const services = document.getElementById('services');

// services info
const ourservices = [{ src: './assets/discover/john-mcarthur-7.png', h3: 'flight booking', p: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint quidem veniam consequatur aperiam!' },
{ src: './assets/discover/shawn-lee-78506.png', h3: 'HOTEL & RESORT BOOKING', p: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint quidem veniam consequatur aperiam!' },
{ src: './assets/discover/natalya-zaritskaya-144626-unsplash.png', h3: 'FAMILY TRIP PLANNER', p: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint quidem veniam consequatur aperiam!' },
{ src: './assets/discover/vidar-nordli-mathisen-559120-unsplash.png', h3: 'CRUISE TOUR', p: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint quidem veniam consequatur aperiam!' },
{ src: './assets/discover/robson-hatsukami-morgan-178532-unsplash.png', h3: 'FIRE CAMP', p: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint quidem veniam consequatur aperiam!' },
{ src: './assets/discover/mimi-thian-737711-unsplash.png', h3: 'CORPORATE HOLIDAYS', p: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint quidem veniam consequatur aperiam!' }
];

// show services
ourservices.forEach(ourservice => {
  service.innerHTML = `
    <img src="${ourservice.src}" alt="flight">
    <h3>${ourservice.h3}</h3>
    <p>${ourservice.p}</p>
    `;

  service.setAttribute('onclick', 'showmodal(this)');

  services.appendChild(service.cloneNode(true));
});


// for modal
function showmodal(w) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.setAttribute('onclick', 'removemodal(this)');

  const modalcnt = document.createElement('div');
  modalcnt.classList.add('modalcnt');

  modalcnt.innerHTML = w.innerHTML;

  modal.appendChild(modalcnt);

  services.appendChild(modal);
}

function removemodal(modal) {
  modal.children[0].style.animationName = 'slideOut';

  setTimeout(() => {
    modal.remove();
  }, 300);
}


//change slides
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides");

  //slides on cycle
  if (n > slides.length) { slideIndex = 1 } //first slide after last one
  if (n < 1) { slideIndex = slides.length } //last slide before first one

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "flex";
}



// toggle navbar
const navBar = document.getElementById("navBar");

function toggleNavbar() {
  if (navBar.style.width == '100%') {
    navBar.style.width = '0';
  } else {
    navBar.style.width = '100%';
  }
}
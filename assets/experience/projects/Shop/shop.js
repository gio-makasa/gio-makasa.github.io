const modal = document.getElementById("profilemodal");
const side = document.getElementById("side");
const sidenav = document.getElementById("mySidenav");
const hots = document.getElementById("hots");
const populars = document.getElementById("populars");

function openNav() {
if(window.innerWidth<=400){
  sidenav.classList.add("col-12");
  sidenav.style.height = "fit-content";
}
else{
  sidenav.classList.add("col-2");
}
sidenav.classList.remove("col-0");
side.classList.add("col-12");
side.classList.remove("col-0");
}

function closeNav() {
if(window.innerWidth<=400){
  sidenav.classList.remove("col-12");
}
else{
  sidenav.classList.remove("col-2");
}
sidenav.classList.add("col-0");
side.classList.remove("col-12");
side.classList.add("col-0");
}

window.onclick = function(event){
if(event.target == modal){
  modal.style.display = "none";
}
if(event.target == side){
  closeNav()
}
}

//main card starts -------------
const card = document.createElement('div'); card.classList.add('card'); card.style.width = '15em';
const img = document.createElement('img'); img.classList.add('card-img-top');
card.appendChild(img);

const card_body = document.createElement('div'); card_body.classList.add('card-body');

//Title
const h4 = document.createElement('h4'); h4.classList.add('card-title');
card_body.appendChild(h4);

//Price
const h5 = document.createElement('h5'); h5.classList.add('card-text');
card_body.appendChild(h5);

//view button
const view = document.createElement('a'); view.classList.add('btn', 'btn-primary');
card_body.appendChild(view);

//cart button
const cart = document.createElement('a'); cart.classList.add('btn', 'btn-warning', 'addcart');
const cart_logo = document.createElement('i'); cart_logo.classList.add('fa', 'fa-cart-plus', 'fa-lg');
cart.appendChild(cart_logo);
card_body.appendChild(cart);

card.appendChild(card_body);
//main card ends -------------------

for(let i = 0; i < 10; i++){
    img.src='../project_pictures/logo.png';
    h4.innerHTML='მოდელი';
    h5.innerHTML= '1000 ლარი';
    view.innerHTML='ნახვა';
    hots.appendChild(card.cloneNode(true));
    populars.appendChild(card.cloneNode(true));
}
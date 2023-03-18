const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const iMGpath = 'https://image.tmdb.org/t/p/w1280';
const searchAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

//adding Genres starts
const submenu_movies = document.getElementById('submenu-movies');
const submenu_shows = document.getElementById('submenu-shows');
const genres = ['ანიმაციური','ბიოგრაფიული','დეტექტივი','დოკუმენტური','დრამა','ეროტიკული','ვესტერნი','ისტორიული','კომედია','მელოდრამა','მიუზიკლი','მოკლემეტრაჟიანი','სათაგადასავლო','ფანტასტიკა','საომარი','საოჯახო','საშინელებათა','თრილერი','ფენტეზი'];

genres.forEach(genre => {
  const menu = document.createElement('div');
  menu.innerText = genre;
  submenu_movies.appendChild(menu);
  submenu_shows.appendChild(menu.cloneNode(true));
});
//adding Genres ends


//carousel cover images starts
const cover_slides = document.querySelectorAll('.d-block');

const covers = ['/fqgH6S2jx2rSUMRTFr8ItNsUM2Z.jpg','/luOLydz3H319kUl79MbBcfGsCgz.jpg','/vIgyYkXkg6NC2whRbYjBD7eb3Er.jpg'];

cover_slides[0].src = iMGpath + covers[0];
cover_slides[1].src = iMGpath + covers[1];
cover_slides[2].src = iMGpath + covers[2];
//carousel cover images ends


//changing slides(not carousel) starts
slides = document.getElementsByClassName("myslides");
var slideIndex = 1;

function plusSlides(n) {
  slides = document.getElementsByClassName("myslides-"+n);
  showSlides(slideIndex += 1);
  slides[slideIndex-1].classList.remove("w3-animate-left");
  slides[slideIndex-1].classList.add("w3-animate-right");
}

function minusSlides(n) {
  slides = document.getElementsByClassName("myslides-"+n);
  showSlides(slideIndex -= 1);
  slides[slideIndex-1].classList.remove("w3-animate-right");
  slides[slideIndex-1].classList.add("w3-animate-left");
}

function showSlides(n) {
  let i;
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}
//changing slides ends


//add movies starts
const movies = document.querySelectorAll('.movies');

getmovies(APIURL);

async function getmovies(url){
  const resp = await fetch(url);
  const respdata = await resp.json();

  showmovies(respdata.results);
}

function showmovies(URLmovies){
  var i=0;
  for(let j=0; j<movies.length; j++){
    var c=5;
    while(c>0){
      const img = document.createElement('img');
      img.src= iMGpath + URLmovies[i].poster_path;
      movies[j].appendChild(img);
      i++;
      c--;
    }
  }
}
//add movies ends


//TV Shows starts

const TVAPIURL = 'https://api.tvmaze.com/shows';
const TVsearchAPI = 'https://api.tvmaze.com/search/shows?q=';

const TV = document.querySelectorAll('.TV');

getTV(TVAPIURL);

async function getTV(url){
  const TVresp = await fetch(url);
  const TVrespdata = await TVresp.json();

  showTV(TVrespdata);
}

function showTV(URLTV){
  var i=0;
  for(let j=0; j<TV.length; j++){
    var c=5;
    while(c>0){
      const img = document.createElement('img');
      img.src= URLTV[i].image.original;
      TV[j].appendChild(img);
      i++;
      c--;
    }
  }
}
//TV Shows ends


//searching starts
const form = document.querySelector('form');
const searchterm = document.getElementById('search');

searchterm.addEventListener('keyup', async () => {
  const search = searchterm.value;
  const results = document.getElementById("searchResults");

  if(search == ''){
    results.style.display = 'none';
  } else {
    results.style.display = 'grid';
    const moviesearchvalue = await searchmovie(search);
    const TVsearchvalue = await searchTV(search);
    const result = document.createElement('div');
    results.innerHTML = '';

    for(let i = 0; i < 7; i++){
      result.innerHTML = `
      <img src="${iMGpath + moviesearchvalue[i].poster_path}" alt="${moviesearchvalue[i].original_title}" class='result'>
    `
    results.innerHTML += result.innerHTML;
    }


    for(let i = 0; i < 7; i++){
      result.innerHTML = `
      <img src="${TVsearchvalue[i].show.image.original}" alt="${TVsearchvalue[i].show.name}" class='result'>
    `
    results.innerHTML += result.innerHTML;
    }
  }
});

async function searchmovie(name){
  const resp = await fetch(searchAPI + name);
  const respdata = await resp.json();
  return respdata.results;
}

async function searchTV(name){
  const TVresp = await fetch(TVsearchAPI + name);
  const TVrespdata = await TVresp.json();
  return TVrespdata;
}
//searching ends
const searchMovieAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';
const searchTVAPI = 'https://api.themoviedb.org/3/search/tv?api_key=04c35731a5ee918f014970082a0088b1&query=';
const iMGpath = 'https://image.tmdb.org/t/p/w1280';
const latestAPI = 'https://api.themoviedb.org/3/movie/latest?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1';
const nowPlayingAPI = 'https://api.themoviedb.org/3/movie/now_playing?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1';
const popularAPI = 'https://api.themoviedb.org/3/movie/popular?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1';
const topRatedAPI = 'https://api.themoviedb.org/3/movie/top_rated?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1';
const upcomingAPI = 'https://api.themoviedb.org/3/movie/upcoming?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1';
const tvAPI = 'https://api.themoviedb.org/3/tv/popular?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1';

const nav = document.querySelector('nav');
const search = document.querySelector('#search');
const searchResults = document.querySelector('#searchResults');
const latestContent = document.querySelector('#latestContent');
const nowPlayingContent = document.querySelector('#nowPlayingContent');
const popularContent = document.querySelector('#popularContent');
const topRatedContent = document.querySelector('#topRatedContent');
const upcomingContent = document.querySelector('#upcomingContent');
const tvContent = document.querySelector('#tvContent');

search.addEventListener('input', (e) => {
  if (e.target.value.trim() == '') {
    searchResults.classList.add('hide')
  } else {
    searchResults.classList.remove('hide')
  }
  searchMovies(e.target.value)
})

async function searchMovies(keyword) {
  const respMovies = await fetch(searchMovieAPI + keyword);
  const moviedata = await respMovies.json();

  const respTVs = await fetch(searchTVAPI + keyword);
  const TVdata = await respTVs.json();

  showSearchmovies(moviedata.results, TVdata.results);
}

function showSearchmovies(movies, TVs) {
  let row = document.createElement('div');

  searchResults.innerHTML = '';

  if (movies.length) {
    searchResults.innerHTML = '<h3>movies:</h3>';
    movies.forEach(movie => {
      if (movie.poster_path)
        row.innerHTML += `<img src=${iMGpath + movie.poster_path} alt="${movie.title}">`;
    });
    searchResults.appendChild(row.cloneNode(true));

    row.innerHTML = '';
  }

  if (TVs.length) {
    searchResults.innerHTML += '<h3>tv shows:</h3>';
    TVs.forEach(tv => {
      if (tv.poster_path)
        row.innerHTML += `<img src=${iMGpath + tv.poster_path} alt="${tv.name}">`;
    });
    searchResults.appendChild(row.cloneNode(true))
  }
}

async function getMovies(url, element) {
  const resp = await fetch(url);
  const respdata = await resp.json();

  showMovies(respdata, element);
}

function showMovies(data, element) {
  let clr = '';

  data.results.forEach(movie => {
    movie.vote_average >= 9 ? clr = 'green' : movie.vote_average >= 5 ? clr = 'yellow' : clr = 'red';
    element.innerHTML += `
    <div class="movieFrame">
    <img src=${movie.backdrop_path ? iMGpath + movie.backdrop_path : "./assets/img/imgholder.png"} alt="${movie.name}">
    <h3>${movie.title || movie.name}</h3>
    <p style="--clr: ${clr};">${movie.vote_average}</p>
    </div>`;
  });
}

function toggleNav() {
  if (nav.style.display != 'flex') {
    nav.style.display = 'flex';
  } else {
    nav.style.display = 'none';
  }
}

getMovies(popularAPI, popularContent);
getMovies(nowPlayingAPI, nowPlayingContent);
getMovies(topRatedAPI, topRatedContent);
getMovies(upcomingAPI, upcomingContent);
getMovies(tvAPI, tvContent);
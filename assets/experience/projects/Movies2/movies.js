const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const iMGpath = 'https://image.tmdb.org/t/p/w1280';
const searchAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

const main = document.querySelector('main');
const form = document.querySelector('form');
const search = document.getElementById('search');

getmovies(APIURL);

async function getmovies(url){
    const resp = await fetch(url);
    const respdata = await resp.json();

    showmovies(respdata.results);
}

function showmovies(movies){
    main.innerText = '';
    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieposter = document.createElement('div');
        movieposter.classList.add('movie');

        movieposter.innerHTML = `
        <img src="${iMGpath + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span style="--clr:${getclassbyrate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                ${overview}
            </div>
        `;

        main.appendChild(movieposter);
    });
}

function getclassbyrate(vote){
    if(vote >= 8) {
        return 'green';
    } else if(vote >= 5) {
        return 'orange';
    } else return 'red';
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searching = search.value;

    if(searching){
        getmovies(searchAPI + searching);

        search.value = '';
    }
});
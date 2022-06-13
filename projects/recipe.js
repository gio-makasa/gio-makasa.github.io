const favlist = document.getElementById("fav-list");
const meals = document.getElementById("meals");
const searchterm = document.getElementById("searchinput");

function search(){
    document.getElementById("searchinput").classList.toggle("show");
    document.getElementById("results").parentElement.style.display = 'none';
}

getramdonmeal();
addfav();

async function getramdonmeal(){
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const respdata = await resp.json();
    const randommeal = respdata.meals[0];
    addmeal(randommeal);
}

async function getmealbyid(id){
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
    const respdata = await resp.json();
    const meal = respdata.meals[0];
    return meal;
}

async function searchmeal(name){
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + name);
    const respdata = await resp.json();
    const meal = respdata.meals;
    return meal;
}

function addmeal(mealdata){
    const meal = document.createElement('div');
    meal.classList.add('meal');
    meal.innerHTML = `
    <img src="${mealdata.strMealThumb}" alt="${mealdata.Meal}">
    <div class="title">
        <h2>${mealdata.strMeal}</h2>
        <button id="favbtn" ><i class="fa-heart"></i></button>
    </div>
    <p></p>
    `
    
    meals.appendChild(meal);
        
    const mealsID = getmealLS();
    const favbtn = document.querySelector('.fa-heart');
    mealsID.includes(mealdata.idMeal) ? favbtn.classList.add("fa-solid") : favbtn.classList.add("fa-regular");


    const btn = meal.querySelector("#favbtn");

    btn.addEventListener("click", () => {
        if(btn.firstChild.classList.contains("fa-solid")){
            removemealLS(mealdata.idMeal);
            btn.firstChild.classList.remove("fa-solid");
            btn.firstChild.classList.add("fa-regular");
        } else if(btn.firstChild.classList.contains("fa-regular")){
            addmealLS(mealdata.idMeal);
            btn.firstChild.classList.remove("fa-regular");
            btn.firstChild.classList.add("fa-solid");
        }

        favlist.innerHTML = '';
        addfav();
    })
}

function addmealLS(mealID){
    const mealsID = getmealLS();

    localStorage.setItem("mealsID", JSON.stringify([...mealsID, mealID]));
}

function removemealLS(mealID){
    const mealsID = getmealLS();

    localStorage.setItem("mealsID", JSON.stringify(mealsID.filter(id => id !== mealID)));
}

function getmealLS(){
    const mealsID = JSON.parse(localStorage.getItem("mealsID"));

    return mealsID === null ? [] : mealsID;
}

async function addfav(){
    favlist.innerHTML = '';
    const mealsID = getmealLS();
    const meals = [];

    for(let i = 0; i < mealsID.length; i++){
        const mealID = mealsID[i];
        var meal = await getmealbyid(mealID);
        addtofav(meal);
    }
}

function addtofav(mealdata){
    const favmeal = document.createElement('li');
    favmeal.innerHTML = `
    <img src="${mealdata.strMealThumb}" alt="${mealdata.strMeal}">
    <span>${mealdata.strMeal}</span>
    <button id="delete"><i class="fa-solid fa-x"></i></button>
    `

    const btn = favmeal.querySelector("#delete");
    const favbtn = document.getElementById("favbtn");

    btn.addEventListener("click", () => {
        removemealLS(mealdata.idMeal);
        if(btn.previousElementSibling.innerHTML == favbtn.previousElementSibling.innerHTML){
            const favbtn = document.querySelector('.fa-heart');
            favbtn.classList.remove('fa-solid');
            favbtn.classList.add('fa-regular');
        }
        addfav();
    });

    favlist.appendChild(favmeal);
}

searchterm.addEventListener('keyup', async () => {
    const search = searchterm.value;
    const results = document.getElementById("results");
    if(search == ''){
        results.parentElement.style.display = 'none';
    } else {
        const searchvalue = await searchmeal(search);
        const result = document.createElement('div');
        results.innerHTML = '';
        for(let i = 0; i < 10; i++){
            result.innerHTML = `
            <div class="result" onclick="searched(${i})">
               <img src="${searchvalue[i].strMealThumb}" alt="${searchvalue[i].strMeal}">
               <h3>${searchvalue[i].strMeal}</h3>
            </div>
        `
        results.parentElement.style.display = 'block';
        results.innerHTML += result.innerHTML;
        }
    }
});

async function searched(e){
    const search = searchterm.value;
    const searchvalue = await searchmeal(search);
    
    const meal = document.querySelector(".meal");
    meal.innerHTML = `
    <img src="${searchvalue[e].strMealThumb}" alt="${searchvalue[e].Meal}">
    <div class="title">
        <h2>${searchvalue[e].strMeal}</h2>
        <button id="favbtn" ><i class="fa-heart"></i></button>
    </div>
    <p></p>
    `
    
    meals.appendChild(meal);
        
    const mealsID = getmealLS();
    const favbtn = document.querySelector('.fa-heart');
    mealsID.includes(searchvalue[e].idMeal) ? favbtn.classList.add("fa-solid") : favbtn.classList.add("fa-regular");


    const btn = meal.querySelector("#favbtn");

    btn.addEventListener("click", () => {
        if(btn.firstChild.classList.contains("fa-solid")){
            removemealLS(searchvalue[e].idMeal);
            btn.firstChild.classList.remove("fa-solid");
            btn.firstChild.classList.add("fa-regular");
        } else if(btn.firstChild.classList.contains("fa-regular")){
            addmealLS(searchvalue[e].idMeal);
            btn.firstChild.classList.remove("fa-regular");
            btn.firstChild.classList.add("fa-solid");
        }

        favlist.innerHTML = '';
        addfav();
    })
    
    document.getElementById("results").parentElement.style.display = 'none';
}

const form = document.querySelector('form');
const searchResult = document.querySelector('.search')
const container = document.querySelector('.container');
let userQuery = '';

var i = 0;
var txt = 'Live, love, eat...';
var speed = 50;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("demo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
//https://api.edamam.com/search

const ID = "491c0a25";
const key = "90f6192735aad01f8dc20fb18ee53869";

form.addEventListener('submit' , (e)=>{
    e.preventDefault();
    userQuery = e.target.querySelector('input').value;
    console.log(userQuery);
    fetchData();
})

async function fetchData(){
 const baseURL = `https://api.edamam.com/search?q=${userQuery}&app_id=${ID}&app_key=${key}`;
 const response = await fetch(baseURL);
 const data = await response.json();
 createContent(data.hits);
 console.log(data);
}

function createContent(results){
    let initialContent = '';
    results.map(result => {
        initialContent += 

        `<div class="item" style=" margin:auto; width:100%; /* background-color: rgb(37,37,37); */background-color: #F9EFE5;padding:15px; overflow: hidden; border-radius: 20px;" >
        <img src="${result.recipe.image}" alt="" style="  width:100%; height:300px; border-radius : 10px;">
        <div class="flex-container" style="   display:flex; align-items: center; justify-content: space-between;">
            <h1 class='title' style="    color:gr;  margin: 20px 10px 0 0; font-size: 1.8rem;font-weight: 400;">${result.recipe.label}</h1>
            <a class='view-btn' style="   text-decoration:none;  text-align: center; width:130px; padding: 10px 0; background-color: #404041; color:white; margin-top:20px; font-size: 15px; align-self : flex-start;" href='${result.recipe.url}'>View Recipe</a>
        </div>
        <p class='recipe-desc' style=" color:grey;  display: block;  margin-top: 10px;font-size:1.4rem; letter-spacing:.05rem; line-height:2rem;">Calories : ${result.recipe.calories.toFixed(2)}</p>
    </div>`


    })
   
    searchResult.innerHTML = initialContent;
}

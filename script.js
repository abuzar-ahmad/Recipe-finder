// script.js



document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.querySelector(".search-bar input[type='text']");

    if (searchInput) {
        searchInput.addEventListener("input", async function() {
            const searchQuery = searchInput.value.trim();
            if (searchQuery !== "") {
                console.log("Search query:", searchQuery);
                // Call the fetchMealsFromApi function with the search query value
                const meals = await fetchMealsFromApi("https://www.themealdb.com/api/json/v1/1/search.php?s=", searchQuery);
                console.log("Meals:", meals);
                // Here you can process the meals data as needed
                displayMeals(meals);
            }
        });
    } else {
        console.error("Search input element not found!");
    }


    const favbtn= document.querySelector(".fav-button");
    favbtn.addEventListener("click",async function(){
        window.location.href = "favorite.html"
    })


   
});


async function fetchMealsFromApi(url, value) {
    const response = await fetch(`${url}${value}`);
    const mealsData = await response.json();
    return mealsData.meals;
}



function displayMeals(meals) {
    const container = document.querySelector(".container");

    // Clear previous results
    container.innerHTML = "";

    if (meals) {
        meals.forEach(meal => {
            const cardHTML = `
                <a onclick="handleRecipeButtonClick(${meal.idMeal})">
                <div class="wrapper">
                <div class="banner-image">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                </div>
                <h1>${meal.strMeal}</h1>
                <div class="button-wrapper"> 
                    <a onclick="handleRecipeButtonClick(${meal.idMeal})" class="btn outline">Recepi</a>
                    <button  onclick="handleFavoriteButtonClick(${meal.idMeal})" class="btn fill">Favorite</button>
                </div>
            </div>
                </a>
            `;
            container.insertAdjacentHTML("beforeend", cardHTML);
        });
    } else {
        container.innerHTML = `<section class="page_404">
	<div class="container">
		<div class="row">	
		<div class="col-sm-12 ">
		<div class="col-sm-10 col-sm-offset-1  text-center">
		<div class="four_zero_four_bg">
			<h1 class="text-center ">404</h1>
		
		
		</div>
		
		<div class="contant_box_404">
		<h3 class="h2">
		No recepi found 
		</h3>
		
		<p>Search for something else</p>
	</div>
		</div>
		</div>
		</div>
	</div>
</section>`;
    }
}

async function handleRecipeButtonClick(id) {
    // Redirect to the new page with the id as a query parameter
    window.location.href = "recipe.html?id=" + id;
}


async function handleFavoriteButtonClick(id){
    const singlemeal = await fetchMealData(id);
    const meal=singlemeal[0];
    console.log(meal);
    saveIntodb(meal);

}


async function fetchMealData(id) {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
    const mealData = await response.json();
    return mealData.meals;    // Add your code here to handle the fetched meal data
}




async function saveIntodb(meal) {
    console.log("imran",meal);
   
    let mealsFromDb = await getFromdb(); // Retrieve meals from local storage
    if (!mealsFromDb) {
        mealsFromDb = []; // Initialize an empty array if no data found
    }

    const isMealInMeals = mealsFromDb.some(mealItem => mealItem.idMeal === meal.idMeal);

    if (!isMealInMeals) {
        mealsFromDb.push(meal);
        localStorage.setItem('recepi', JSON.stringify(mealsFromDb)); // Save the updated array to localStorage
        alert("Recipe added to favorites");
    } else {
        alert("Recipe is already in favorites");
    }
}

async function getFromdb() {
    const recepi = localStorage.getItem('recepi');
    return recepi ? JSON.parse(recepi) : null; // Parse the stored JSON string or return null if no data found
}
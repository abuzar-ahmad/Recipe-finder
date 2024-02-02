document.addEventListener("DOMContentLoaded", async function() {
    const butn =document.querySelector(".sample");
    // Check if the URL contains query parameters
    let id =0;
        if (window.location.search) {
            // Get the value of the 'id' parameter from the URL
            const urlParams = new URLSearchParams(window.location.search);
             id = urlParams.get('id');

            // Now you have the 'id' available for further use
            console.log(id);
        } else {
            console.error("No query parameters found in the URL");
        }

//to go to the favorite page
        const favbtn= document.querySelector(".fav-button");
        favbtn.addEventListener("click",async function(){
            window.location.href = "favorite.html"
        })

    
     const singlemeal = await fetchMealData(id);
     console.log("222222",singlemeal);
     displayMeal(singlemeal);
    
   


    function displayMeal(meal){
        console.log("33333",meal);
        console.log("44444",meal[0].strMeal);
        const container =document.querySelector(".container")

        container.innerHTML="";
        if(meal){
            const cardHtml=`
            <div class="recipe-card">
            <div class="header">
                <div class="image"><img src="${meal[0].strMealThumb}" alt="${meal[0].strMeal}"></div>
                <div class="title">${meal[0].strMeal}</div>
            </div>
            <div class="details">
                <div class="category">Category: ${meal[0].strCategory}</div>
                <div class="area">Area: ${meal[0].strArea}</div>
            </div>
            <div class="instructions">
                <h3>Instructions:</h3>
                <p>${meal[0].strInstructions}</p>
            </div>
            <a href="${meal[0].strYoutube}" target="_blank" class="button">Watch Video</a>
        </div>
            `;
            container.insertAdjacentHTML("beforeend", cardHtml);

        }

    }
   
});

async function fetchMealData(id) {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
    const mealData = await response.json();
    console.log(11111,mealData);
    return mealData.meals;    // Add your code here to handle the fetched meal data
}
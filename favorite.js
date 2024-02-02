document.addEventListener("DOMContentLoaded", async function() {
    try {
        
        
        // Call the function to display recipes from localStorage
        displayRecipesFromLocalStorage();
    } catch (error) {
        console.error("An error occurred:", error);
    }

    
    





});

async function displayRecipesFromLocalStorage() {
    const recipes = await getFromdb(); // Await the result of getFromdb()
    if (recipes) {
        console.log("Recipes from localStorage:", recipes);
        // Now you can display or process the recipes as needed
    } else {
        console.log("No recipes found in localStorage");
    }
    const container = document.querySelector(".container");

    // Clear previous results
    container.innerHTML = "";
                if (recipes) {
            recipes.forEach(meal=>{
                const cardHTML=`
                <a onclick="handleRecipeButtonClick(${meal.idMeal})">
                <div class="wrapper">
                <div class="banner-image">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                </div>
                <h1>${meal.strMeal}</h1>
                <div class="button-wrapper"> 
                    <a onclick="handleRecipeButtonClick(${meal.idMeal})" class="btn outline">Recepi</a>
                    <button  onclick="handleFavoriteRemoveButtonClick(${meal.idMeal})" class="btn fill">Remove</button>
                </div>
            </div>
                </a>
                
                `;
                container.insertAdjacentHTML("beforeend", cardHTML);
            })
            
        }else{
            const cardHTML=`
            <div class="some">
            <h1>There are no favorites Right Now</h1>
        <p>Search for amazing recipes on the home page.</p>
        </div>
            `
            container.insertAdjacentHTML("beforeend", cardHTML);

        }




}
async function handleFavoriteRemoveButtonClick(id){
    console.log("11111",id);
   await removeFromDb(id);
    
    }

async function handleRecipeButtonClick(id) {
    // Redirect to the new page with the id as a query parameter
    window.location.href = "recipe.html?id=" + id;
}





async function getFromdb() {
    const recepi = localStorage.getItem('recepi');
    return recepi ? JSON.parse(recepi) : null; // Parse the stored JSON string or return null if no data found
}


async function removeFromDb(id) {
    console.log("222222",id);

    try {
        let recipes = await getFromdb(); // Get the current array of recipes from local storage
        console.log("33333",recipes);
        

        
        if (recipes) {
            // Filter out the recipe with the specified id
            recipes = recipes.filter(recipe => recipe.idMeal != id);
            //recipes = recipes.map(recipe => recipe.idMeal);
            // Update local storage with the modified array
            console.log("44444",recipes);
            localStorage.setItem('recepi', JSON.stringify(recipes));
            console.log("55555",recipes);
               // alert("Recipe removed from favorites")
              await  displayRecipesFromLocalStorage()
        } else {
            console.log("No recipes found in localStorage");
        }
    } catch (error) {
        console.error("An error occurred while removing recipe:", error);
    }
}


let recipeArray = JSON.parse(localStorage.getItem("Recipe_Data"))

function saveToLS() {
    localStorage.setItem("Recipe_Data" , JSON.stringify(recipeArray))
}

function renderRecipe() {

    let allCategories = recipeArray.map(recipe => recipe.category);
    let uniqueCategories = [ ...new Set(allCategories) ];

}
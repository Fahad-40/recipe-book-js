const categoriesContainer = document.querySelector(".recipe-grid")

let recipeArray = JSON.parse(localStorage.getItem("Recipe_Data")) || []

function saveToLS() {
    localStorage.setItem("Recipe_Data", JSON.stringify(recipeArray))
}

recipeArray.push({ 
    id: 1 , 
    category: "breakfast",
image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
title: "Truffle Mushroom Risotto 1",
time: 35,
servings: 10
},
{
    id: 2 , 
    category: "Dinner",
image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
title: "Truffle Mushroom Risotto 2",
time: 55 ,
servings: 11
},
    )
function renderRecipe() {
    categoriesContainer.innerHTML = "";

    let allCategories = recipeArray.map(recipe => recipe.category);
    let uniqueCategories = [...new Set(allCategories)];

    uniqueCategories.forEach(category => {
        const recipesInCategory = recipeArray.filter(recipe => recipe.category === category);

        let recipesHTML = "";
        recipesInCategory.forEach(recipe => {
            recipesHTML += `
                <article class="recipe-card group cursor-pointer" data-id="${recipe.id}">
                    <div class="relative w-full aspect-[4/5] overflow-hidden rounded-md mb-5 bg-charcoal-800">
                        <img src="${recipe.image}" alt="${recipe.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out grayscale-[20%] group-hover:grayscale-0">
                        <div class="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-charcoal-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div class="absolute top-4 left-4 z-10">
                            <button class="js-favorite-btn text-gold-500 hover:scale-110 transition-transform bg-charcoal-900/40 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center" data-id="${recipe.id}">
                                <i class="fa-solid fa-heart"></i>
                            </button>
                        </div>
                        <div class="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button class="js-delete-btn text-gray-300 hover:text-red-400 bg-charcoal-900/60 hover:bg-charcoal-900 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center transition-all" data-id="${recipe.id}">
                                <i class="fa-solid fa-trash-alt text-sm"></i>
                            </button>
                        </div>
                    </div>
                    <div class="recipe-meta flex flex-col js-open-recipe-modal" data-id="${recipe.id}">
                        <span class="text-gold-500 text-[10px] uppercase tracking-[0.2em] font-semibold mb-2">${recipe.category}</span>
                        <h3 class="font-serif text-2xl text-offwhite mb-3 group-hover:text-gold-400 transition-colors">${recipe.title}</h3>
                        <div class="flex items-center gap-4 text-xs text-gray-400 font-light">
                            <span><i class="fa-regular fa-clock mr-1.5"></i> ${recipe.time} min</span>
                            <span class="w-1 h-1 rounded-full bg-gray-600"></span>
                            <span><i class="fa-solid fa-utensils mr-1.5"></i> ${recipe.servings} Servings</span>
                        </div>
                    </div>
                </article>
            `;
        });

         categoriesContainer.innerHTML += ` 
            <div class="col-span-full w-full mt-4 first:mt-0">
                <h2 class="text-xl font-serif tracking-widest text-gold-500 uppercase border-b border-white/5 pb-2 mb-8 flex items-center gap-4">
                    ${category} <span class="text-xs text-gray-600 font-sans tracking-normal font-light">(${recipesInCategory.length} Items)</span>
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16 mb-12">
                    ${recipesHTML}
                </div>
            </div>
        `; 
    });
}
renderRecipe();

categoriesContainer.addEventListener("click" , (e) => {
    if (e.target.closest(".js-open-recipe-modal")) {
        const clickedBtn = e.target.closest(".js-open-recipe-modal");
        const clickedBtnId = Number(clickedBtn.dataset.id);
const clickedRecipe = recipeArray.find(recipe => recipe.id === clickedBtnId);
console.log(clickedRecipe); 
    }
})

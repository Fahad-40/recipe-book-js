let categoriesContainer = document.querySelector(".recipe-grid")
let recipeModalBackdrop = document.querySelector(".recipe-modal-backdrop")
let closeRecipeModal = document.querySelector(".js-close-recipe-modal") || null;

let recipeArray = JSON.parse(localStorage.getItem("Recipe_Data")) || []

function saveToLS() {
    localStorage.setItem("Recipe_Data", JSON.stringify(recipeArray))
}

recipeArray.push({
    id: 1,
    category: "Main Course",
    title: "Classic Butter Chicken",
    time: 25,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    prepTime: "20 Mins",
    cookTime: "30 Mins",
    servings: "4",
    ingredients: [
        "800g Chicken thighs (boneless, bite-sized cubes)",
        "1 cup Plain yogurt",
        "2 tbsp Lemon juice",
        "1 tbsp Garam masala",
        "2 cups Tomato puree",
        "1 cup Heavy cream",
        "100g Unsalted butter",
        "2 tbsp Ginger-garlic paste"
    ],
    steps: [
        "Chicken ko yogurt, lemon juice, aur masalon ke sath marinate karein aur kam se kam 30 minute ke liye rakh dein.",
        "Ek bade pan mein butter garam karein aur marinate kiya hua chicken sunhara hone tak fry karein.",
        "Usi pan mein ginger-garlic paste aur tomato puree dal kar 10 minute tak pakahein jab tak tel alag na ho jaye.",
        "Heavy cream aur bacha hua butter shamil karein, phir chicken dal kar dhimi aanch par 5-7 minute ke liye dum par rakh dein."
    ]
},
    {
        id: 2,
        category: "Dessert",
        title: "Molten Chocolate Lava Cake",
        time: 55,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        prepTime: "15 Mins",
        cookTime: "12 Mins",
        servings: "2",
        ingredients: [
            "100g High-quality dark chocolate",
            "50g Unsalted butter",
            "2 Large eggs",
            "1/4 cup Granulated sugar",
            "2 tbsp All-purpose flour",
            "A pinch of Salt"
        ],
        steps: [
            "Oven ko 200°C par preheat karein aur ramekins (molds) ko butter aur cocoa powder se grease kar lein.",
            "Chocolate aur butter ko ek bowl mein dal kar double boiler ya microwave mein melt karein aur thanda hone dein.",
            "Ek alag bowl mein eggs aur sugar ko tab tak beat karein jab tak wo fluffy aur pale yellow na ho jaye.",
            "Melted chocolate aur flour ko aahista se egg mixture mein fold karein, molds mein dalein aur 10-12 minute bake karein."
        ]
    },
    {
        id: 3,
        category: "Beverage",
        title: "Mint Lemonade",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        time: 45,
        prepTime: "5 Mins",
        cookTime: "0 Mins",
        servings: "2",
        ingredients: [
            "1/2 cup Fresh mint leaves",
            "4 tbsp Lemon juice",
            "3 tbsp Sugar (or honey)",
            "2 cups Chilled water",
            "1 cup Ice cubes",
            "A pinch of Black salt"
        ],
        steps: [
            "Mint leaves, lemon juice, sugar, aur black salt ko blender jag mein dalein.",
            "Chilled water shamil karein aur blend karein jab tak mint achi tarah pees na jaye.",
            "Glass mein ice cubes dalein, drink ko strain (chhan) kar ke serve karein."
        ]
    }
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

categoriesContainer.addEventListener("click", (e) => {
    if (e.target.closest(".js-open-recipe-modal")) {
        const clickedBtn = e.target.closest(".js-open-recipe-modal");
        const clickedBtnId = Number(clickedBtn.dataset.id);
        const clickedRecipe = recipeArray.find(recipe => recipe.id === clickedBtnId);
        console.log(clickedRecipe);
        openModel(clickedRecipe)
    }

})

recipeModalBackdrop.addEventListener("click", (e) => {
    if (e.target.closest(".js-close-recipe-modal") || (e.target === recipeModalBackdrop)) {
        console.log("cross button clicked")
        recipeModalBackdrop.classList.add("hidden");
  }
})

function openModel(recipe) {
    recipeModalBackdrop.innerHTML = "";
    recipeModalBackdrop.innerHTML = `

     <div class="recipe-modal-window relative w-full max-w-5xl max-h-[90vh] bg-charcoal-800 rounded-lg shadow-2xl flex flex-col lg:flex-row overflow-hidden border border-white/10">
            
            <button class="js-close-recipe-modal absolute top-4 right-4 z-20 w-10 h-10 bg-charcoal-900/80 hover:bg-gold-500 text-offwhite hover:text-charcoal-900 rounded-full flex items-center justify-center transition-colors">
                <i class="fa-solid fa-times"></i>
            </button>

            <div class="w-full lg:w-2/5 h-64 lg:h-auto bg-charcoal-700 relative">
                <img src="${recipe.image}" alt="${recipe.title}" class="w-full h-full object-cover">
            </div>

            <div class="w-full lg:w-3/5 overflow-y-auto hide-scrollbar p-8 lg:p-12">
                <span class="text-gold-500 text-[10px] uppercase tracking-[0.2em] font-semibold">${recipe.category}</span>
                <h2 class="font-serif text-3xl lg:text-4xl text-offwhite mt-2 mb-6">${recipe.title}</h2>
                
                <div class="flex items-center gap-6 pb-6 border-b border-white/10 mb-8">
                    <div class="flex flex-col">
                        <span class="text-xs text-gray-500 uppercase tracking-wider mb-1">Prep Time</span>
                        <span class="text-sm font-medium text-offwhite">${recipe.prepTime}</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-xs text-gray-500 uppercase tracking-wider mb-1">Cook Time</span>
                        <span class="text-sm font-medium text-offwhite">${recipe.cookTime}</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-xs text-gray-500 uppercase tracking-wider mb-1">Yields</span>
                        <span class="text-sm font-medium text-offwhite">${recipe.servings} Servings</span>
                    </div>
                </div>

                <div class="mb-10">
                    <h4 class="font-serif text-xl text-gold-400 mb-4 italic">The Ingredients</h4>
                    <ul class="space-y-3">
                        ${recipe.ingredients.map(ing => `
                            <li class="flex items-start text-sm text-gray-300">
                                <span class="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 mr-3 flex-shrink-0"></span>
                                ${ing}
                            </li>
                        `).join("")}
                    </ul>
                </div>

                <div>
                    <h4 class="font-serif text-xl text-gold-400 mb-4 italic">Method of Preparation</h4>
                    <ol class="space-y-6 list-none">
                        ${recipe.steps.map((step, index) => `
                            <li class="relative pl-8 text-sm text-gray-300 leading-relaxed">
                                <span class="absolute left-0 top-0 font-serif text-gold-500 font-bold text-lg">${index + 1}.</span>
                                ${step}
                            </li>
                        `).join("")}
                    </ol>
                </div>
            </div>
        </div>
    
    `;

    recipeModalBackdrop.classList.remove("hidden");

}
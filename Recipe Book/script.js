const recipes = [];

//Declared index of the recipe to be edited
var indexOfRecipeToBeEdited = -1

// Declared a flag to set the edit mode
var isEditMode = false;

// Update a recipe when the "Add Recipe" button is clicked
// If the recipe is new, then add the recipe to the recipes array 
// Use addRecipes() function to add the new recipe
// Else edit the recipe in the recipes array
// Clear the form's input fields using the clearInputFields() function
// Finally, display the recipes using the displayRecipes() function
document.getElementById('add-recipe-btn').addEventListener('click', function() {
   
    const title = document.getElementById("title").value;
    const ingredients = document.getElementById("ingredients").value;
    const instructions = document.getElementById("instructions").value;

    if(isEditMode) {
        recipes[indexOfRecipeToBeEdited].title = title;
        recipes[indexOfRecipeToBeEdited].ingredients = ingredients;
        recipes[indexOfRecipeToBeEdited].instructions = instructions;
       
    } else {
        addRecipe({title, ingredients,instructions });
        
    }
    displayRecipes();
    clearInputFields();
 
});

// Clear the form's input fields
function clearInputFields() {
  
    document.getElementById('title').value = "";
    document.getElementById('ingredients').value ="";
    document.getElementById('instructions').value = "";
}

// Add the new recipe to the recipes array
function addRecipe(recipe) {
    
    const{title, ingredients,instructions} = recipe;
    recipes.push(recipe);
}

// Display Recipes
function displayRecipes() {
    
    const recipeDiv = document.getElementById('recipes');
    recipeDiv.innerHTML="";
    recipes.forEach((recipe, index)=>{
        const li = document.createElement("li");
        li.innerHTML = `
            <label>${recipe.title} </label><br>
            <label>Ingredients: </label>${recipe.ingredients} <br>
            <label>instructions: </label>${recipe.instructions} <br>
            <button onclick="editRecipe(${index})">Edit</button>
            <button onclick="deleteRecipe(${index})">Delete</button>
            <br><br>`;
            recipeDiv.appendChild(li);
        }) ;

}

// Edit the recipe object when the Edit button is clicked
function editRecipe(index) {
    
   
    const recipe = recipes[index];
    document.getElementById("title").value = recipe.title;
    document.getElementById("ingredients").value = recipe.ingredients;
    document.getElementById("instructions").value = recipe.instructions;
    indexOfRecipeToBeEdited = index;
    isEditMode = true;
}

// Delete the recipe object when the Delete button is clicked
function deleteRecipe(index){
    if (index >= 0 && index < recipes.length) {
        recipes.splice(index, 1); // Remove 1 element at the specified index
        displayRecipes();
        console.log(recipes)
        clearInputFields();
        isEditMode = false;
    }
}
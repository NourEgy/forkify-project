var parcelRequire;
"use strict";
if (module.hot) module.hot.accept();
// Import Libraries
import "regenerator-runtime/runtime";

// Import Files
import * as modal from "./modal.js";
import {MODAL_CLOSE_SEC} from "./config.js";
import recipeView from "./view/recipeView.js";
import searchView from "./view/searchView.js";
import resultView from "./view/resultView.js";
import paginationView from "./view/paginationView.js";
import bookmarksView from "./view/bookmarksView.js";
import addRecipeView from "./view/addRecipeView.js";





// Show Recipe
const controlRecipes = async function() {

    // ID Come From a#link Hash
    const id = window.location.hash.slice(1);
    if(!id) return; 

    // Spinner Render    
    recipeView.renderSpinner();

    try {
        // 0) update Result view to mark selected search result
        resultView.update(modal.getSearchResultPage());
        bookmarksView.update(modal.state.bookmarks);
        // 1) Realod API
        // LoadRecipe From modal
        await modal.loadRecipe(id);
        // const {recipe} = modal.state;
       

        // 2) Set Data
        // Render Recipe
        recipeView.render(modal.state.recipe);
    

        // Test 
        //controlServings();

    // Catch Errors
    } catch(error) {
        // render Message
        recipeView.renderError();
        console.error(`${error} Error!!`);
    }
}

// Control search Results 
const controlSearchResults = async function() {
    try {
        resultView.renderSpinner();

        // 1) GEt Search Query
        const query = searchView.getQuery();
        if(!query) return;

        // 2) Load Search Result
        await modal.loadSearchResults(query);

        // 3) Render Result
        // resultView.render(modal.state.search);
        resultView.render(modal.getSearchResultPage());

        // 4) Render Pagination
        paginationView.render(modal.state.search);

    } catch(error) {
       // resultView.renderError();
        console.error(`${error} Error!!`);
    }
}


// ControlRecipes Event 
// controlRecipes();

// Render With Change Hash
// window.addEventListener("hashchange", controlRecipes);
// window.addEventListener("load", controlRecipes);

// Control Pagination And Update Data
const controlPagination = function(goToPage) {
    // 3) Render New Result
    resultView.render(modal.getSearchResultPage(goToPage));
    // Update The Recipe View
    paginationView.render(modal.state.search);
}

// Update Servings
const controlServings = function(newServings) {
    modal.updateServings(newServings);
    // Update The Recipe View
    // recipeView.render(modal.state.recipe);
    recipeView.update(modal.state.recipe);
}

// control bookmark
const controlAddBookmark = function() {
    // 1) Add bookmark
    if (!modal.state.recipe.bookmarked) modal.addBookmark(modal.state.recipe)
    else modal.deleteBookmark(modal.state.recipe.id);

     // 2) Update The Recipe View
    recipeView.update(modal.state.recipe);

    // 3) render bookmarks
    bookmarksView.render(modal.state.bookmarks);
}

// Add Handler bookmark 
const controlBookmark = function() {
    bookmarksView.render(modal.state.bookmarks);
}


// add new recipe
const controlAddRecipe = async function(newRecipe) {
    try {


        // Spinner Render    
        recipeView.renderSpinner();

        // Update Recipe
       await modal.updateRecipe(newRecipe);

       // render Recipe
       recipeView.render(modal.state.recipe);

       // Success Message
       addRecipeView.renderMessage();

       // Render Bookmark
       bookmarksView.render(modal.state.bookmarks);

       window.history.pushState(null, '', `#${modal.state.recipe.id}`);
       window.history.back();

       // close window
       setTimeout(()=> {
        addRecipeView.toggleWindow();
       }, MODAL_CLOSE_SEC);

    } catch(error) {
        console.error('Error!', error);
        addRecipeView.renderError(error.message);
    }
}

// app massate
const newFeature = function() {
    console.log("Welcome to App!");
}
// Init Heandler
const init = function() {
    bookmarksView.addHandlerRender(controlBookmark);
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
    addRecipeView.addHandlerUpload(controlAddRecipe);
    newFeature();
}
init();

/**
 * = Challengs
 * 0) Display Number if oages between the pagination buttons
 * 1) Ability to sort search results by duration of number of ingredients
 * 2) Perform Ingredient Validation In view, before submitting the form
 * 3) improve recipe ingredient input: separate in multiple fields and allow more the 6 ingredents
 * 4) Shopping list feature button on recipe to add ingredients to a list
 * 5) weekly meal planning feature assign recipes to the next 7 days and show on a weekly calendar
 * 6) get nutrition data on each ingredient from spoonacular.com and calculate total calories of recipe
 */
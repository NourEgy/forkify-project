//import {async} from "regenerator-runtime";

import { API_URL, RES_PER_PAGE, KEY } from "./config.js";
//import { getJSON, sendJSON } from "./helpers.js";
import { AJAX } from "./helpers.js";

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        resultPerPage: RES_PER_PAGE,
        page: 1
    },
    bookmarks: []
};

// create recipe object data 
const createRecipeObject = function(data) {
    let {recipe} = data.data;
    return {
        id: recipe.id,
        image: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
        cookingTime: recipe.cooking_time,
        sourceUrl: recipe.source_url,
        servings: recipe.servings,
        ingredients: recipe.ingredients,
        ...(recipe.key && {key: recipe.key}),
    };
}
// Loading Recipe
export const loadRecipe = async function(id) {

    try {
        // Fetch API
        const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);

        // Get Data
        state.recipe = createRecipeObject(data);

        if (state.bookmarks.some(bookmark => bookmark.id === id)) state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;

    } catch(error) {
        console.error(`${error} Error!!`);
        throw error;
    };
};


// Load Search Results
export const loadSearchResults = async function(query) {
    try {
        state.search.query = query;

        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
        
        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                image: rec.image_url,
                publisher: rec.publisher,
                title: rec.title,
                ...(rec.key && {key: rec.key}),
            }
        });

        // Back Search To Page 1
        state.search.page = 1;

    } catch(error) {
        console.error(`${error} Error!!`);
        throw error;
    }
}

// Search Pagination
export const getSearchResultPage = function(page = state.search.page) {
    state.search.page = page;

    const start = (page - 1) * state.search.resultPerPage; // 0
    const end = page * state.search.resultPerPage; // 10
    return state.search.results.slice(start, end);
}

// Update Servings
export const updateServings = function(newServings) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    });

    state.recipe.servings = newServings
}

// SetLocal sotrage
const persisBookmark = function() {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}
// Add bookmark
export const addBookmark = function(recipe) {
    // Add Bookmark
    state.bookmarks.push(recipe);

    // Mark Current recipe as bookMarked
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

    persisBookmark();
}

// delete bookmark
export const deleteBookmark = function(id) {
    const index = state.bookmarks.findIndex(el => el.id === id);
    // delete
    state.bookmarks.splice(index, 1);

    // Mark Current recipe as NOT bookMarked
    if (id === state.recipe.id) state.recipe.bookmarked = false;

    persisBookmark();

}

// init bookmark form storage
const init = function() {
    const storage =  localStorage.getItem("bookmarks");
    if (storage) state.bookmarks = JSON.parse(storage);
}
init();

// Clear bookmark from local storage
const clearBookmark = function() {
    localStorage.clear("bookmarks");
}
//clearBookmark();

// Update Recipe
export const updateRecipe = async function(newRecipe) {
    try {
        const ingredients = Object.entries(newRecipe)
        .filter(entry => entry[0].startsWith("ingredient") && entry[1] !== '')
        .map(ing => {
            const ingArr = ing[1].split(',').map(el => el.trim());
            //const ingArr = ing[1].replaceAll(' ', '').split(',');
            if (ingArr.length !== 3) throw new Error('Wrong ingredient Fromat please use the currect format:)')
            const [quantity, unit, description] = ingArr;
            return {quantity: quantity ? +quantity : null , unit, description};
        });
        
        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients,
        }
        const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
        state.recipe = createRecipeObject(data);
        addBookmark(state.recipe)
    } catch(error) {
        throw error;
    }
   
}
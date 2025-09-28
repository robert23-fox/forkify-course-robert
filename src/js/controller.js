"use strict";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarkView from "./views/bookmarkView.js";
import addRecipeView from "./views/addRecipeView.js";
import { MODAL_CLOSE_SEC } from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(`Response took too long! Timeout after ${s} seconds`);
  }, s * 1000);
};

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;
    // console.log(id);
    // Spinner
    recipeView.renderSpinner();
    // 0) Update results view to mark selected search results
    resultsView.update(model.getSearchResultsPerPage());
    bookmarkView.update(model.state.bookmarks);
    // 1) Load Recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError(err);
  }
};

const controlSearchRecipes = async function () {
  try {
    resultsView.renderSpinner();
    // 1) get the data
    const query = searchView.getQuery();

    // 2) Load data
    await model.loadSearchRecipes(query);

    // 2) Render results
    resultsView.render(model.getSearchResultsPerPage());

    // 4) Render initail pagination View
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render new results
  resultsView.render(model.getSearchResultsPerPage(goToPage));

  // 2) Render new paginations
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the recipe servings (in state)
  model.updateServings(newServings);

  // update the View
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Update the recipe bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // 2) Update the View
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Render Spinner
    addRecipeView.renderSpinner();
    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);

    // Render Recipe
    recipeView.render(model.state.recipe);

    // Render success
    addRecipeView.renderMessage();

    // Change the ID in the url
    window.history.pushState(null, "", `${model.state.recipe.id}`);
    // Close form window;
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarkView.addHandlerBookmark(controlBookmarks);
  recipeView.addHandlerRecipe(controlRecipe);
  recipeView.addHandlerUpdateRecipeServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchRecipes);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
//
//
//
//
//
//
//
//
/////////// Bookmark dropdown ////////////////
const bookmarkButton = document.querySelector(".nav__btn--bookmarks");
const dropdown = document.querySelector(".bookmarks");

let timeoutBookmark;

const showDropdown = function () {
  clearTimeout(timeoutBookmark);
  dropdown.classList.remove("opacity-0", "scale-95", "pointer-events-none");
  dropdown.classList.add("opacity-100", "scale-100");
};

const hideDropdown = function () {
  timeoutBookmark = setTimeout(() => {
    dropdown.classList.remove("opacity-100", "scale-100");
    dropdown.classList.add("opacity-0", "scale-95", "pointer-events-none");
  }, 300);
};

bookmarkButton.addEventListener("mouseenter", showDropdown);
bookmarkButton.addEventListener("mouseleave", hideDropdown);
dropdown.addEventListener("mouseenter", () => {
  if (dropdown.classList.contains("opacity-100")) showDropdown();
});
dropdown.addEventListener("mouseleave", hideDropdown);
/////////// end Bookmark dropdown ////////////////

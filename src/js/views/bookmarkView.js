"use strict";

import View from "./view";
import previewView from "./previewView.js";

class BookmarkView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No recipes found for your query! Please try again";
  _message = "";

  addHandlerBookmark(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    // console.log(this._data);
    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }
}

export default new BookmarkView();

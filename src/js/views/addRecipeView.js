"use strict";
import View from "./view.js";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _message = "Recipe was successfuly updated";
  _overlay = document.querySelector(".overlay");
  _window = document.querySelector(".add-recipe-window");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    this._addHandlerOpen();
    this._addHandlerClose();
  }

  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  _addHandlerOpen() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerClose() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener(
      "click",
      function (e) {
        if (e.target === this._overlay) {
          this.toggleWindow();
        }
      }.bind(this)
    );
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new AddRecipeView();

/*
Inside that function (e) { ... }, the value of this is not your class instance anymore.

In event listeners with a regular function, this refers to the element the event was attached to (in this case, this._overlay, the DOM element).

So inside that function, this is the <div class="overlay">...</div> element, not your AddRecipeView instance.

That’s why this._overlay and this._toggleWindow are undefined there → it breaks.
*/

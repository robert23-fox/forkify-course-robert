"use strict";

import View from "./view";

class PreviewView extends View {
  _parentElement = "";

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return `
      <li
        class="preview ${
          this._data.id === id ? "bg-gray-100" : ""
        } p-1 w-full transform transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-gray-50"
      >
        <a href="#${this._data.id}" class="flex flex-row space-x-4 items-start">
          <figure class="relative bg-green-200 w-16 h-16 rounded-full flex-shrink-0">
            <img
              src="${this._data.imageUrl}"
              alt="recipe image"
              class="w-16 h-16 rounded-full"
            />
            <div
              class="absolute inset-0 bg-gradient-to-br from-orange-200/50 to-orange-400/50 w-16 h-16 rounded-full"
            ></div>
          </figure>
          <div class="flex flex-col justify-start space-y-2">
            <h1 class="title text-orange-400 uppercase text-sm overflow-x-hidden">
              ${this._data.title}
            </h1>
            <p class="publisher text-xs uppercase">${this._data.publisher}</p>
             <div class="preview__user-generated ${
               this._data.key ? "" : "hidden"
             }">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill text-orange-400" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>
            </div>
          </div>
        </a>
      </li>
    `;
  }
}

export default new PreviewView();

import Fraction from "fraction.js";
import View from "./view.js";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe__container");
  _errorMessage = "We chould not find that recipe. Try another one.";
  _message = "";

  addHandlerRecipe(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  addHandlerUpdateRecipeServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-update-servings");
      if (!btn) return;
      const { updateTo } = btn.dataset;
      handler(+updateTo);
    });
  }

  addHandlerBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".servings__btn--bookmark");
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
        <div class="relative w-full h-60">
          <img
            src="${this._data.imageUrl}"
            alt="image of the recipe"
            class="w-full h-60 object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-tl from-orange-500/30 to-orange-200/30"
          ></div>
        </div>
        <!-- Title Figure -->
        <figure class="relative w-full">
          <h1
            class="absolute bottom-0 left-1/2 translate-x-[-50%] transalate-y-[5%] skew-y-[-6deg] text-white uppercase text-center w-1/2 text-[1.5rem] font-bold leading-[1.95]"
          >
            <span
              class="bg-gradient-to-br from-orange-200 to-orange-400 px-6 py-4 [box-decoration-break:clone] inline"
            >
              ${this._data.title}
            </span>
          </h1>
        </figure>
        <!-- end Title Figure -->
        <!-- Container Duration and servings -->
        <div
          class="w-full h-32 bg-gray-100/50 flex flex-row justify-between items-center px-14 text-sm py-10"
        >
          <!-- duration and servings -->
          <div class="flex flex-row space-x-8">
            <!-- minutes -->
            <div
              class="space-x-2 flex flex-row items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                class="bi bi-clock text-orange-400"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"
                />
                <path
                  d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"
                />
              </svg>
              <span class="font-semibold">${this._data.cookingTime}</span
              ><span class="uppercase text-gray-700">minutes</span>
            </div>
            <!-- servings -->
            <div
              class="space-x-2 flex flex-row items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                class="bi bi-people text-orange-400"
                viewBox="0 0 16 16"
              >
                <path
                  d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
                />
              </svg>
              <span class="font-semibold">${this._data.servings}</span
              ><span class="uppercase text-gray-700">servings</span>
              <!-- servings buttons -->
              <div class="flex flex-row space-x-1">
                <button data-update-to="${
                  this._data.servings - 1
                }" class="btn-update-servings hover:-translate-y-[0.1rem] duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-dash-circle text-orange-400"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
                    />
                    <path
                      d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"
                    />
                  </svg>
                </button>
                <button data-update-to="${
                  this._data.servings + 1
                }"  class="btn-update-servings hover:-translate-y-[0.1rem] duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-plus-circle text-orange-400"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
                    />
                    <path
                      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <!-- end duration and servings -->
          <!-- account and bookmark -->
          <div class="flex flex-row justify-center items-center space-x-3">
            <div class="px-2 py-2 bg-gray-200 rounded-full ${
              this._data.key ? "" : "hidden"
            }"">
  
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill text-orange-400" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>
         
            </div>
            <button
              class="servings__btn--bookmark px-2 py-2 bg-gradient-to-tr from-orange-400 to-orange-200 rounded-full"
            > ${
              this._data.bookmarked
                ? ` <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-bookmark-fill text-white"
              viewBox="0 0 16 16"
              >
                <path
                  d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"
                  />
              </svg> `
                : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bookmark text-white" viewBox="0 0 16 16">
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
              </svg>`
            }
               
            </button>
          </div>
          <!-- end account and bookmark -->
        </div>
        <!-- end Container Duration and servings -->
        <!-- Container recipe ingredients -->
        <div
          class="w-full flex flex-grow flex-col items-center justify-center p-10 bg-gray-100"
        >
          <h2 class="uppercase text-lg font-semibold text-orange-400">
            Recipe ingredients
          </h2>
          <!-- Ingredients container -->
          <ul class="grid grid-cols-2 gap-4 p-2 px-4">
            <!-- first ingredient -->
            ${this._data.ingredients
              .map((ing) => this._renderIngredient(ing))
              .join("")}
            
            <!--end Ingredients container -->
          </ul>
        </div>
        <!--end Container recipe ingredients -->
        <!-- How to Container -->
        <div
          class="w-full flex flex-col justify-center items-center space-y-6 p-10 bg-gray-100/50"
        >
          <h2 class="uppercase text-orange-400 text-base font-semibold">
            How to Cook it
          </h2>
          <p class="text-gray-500 text-sm text-center">
            This recipe was carefully designed and tested by
            <span class="text-semibold text-gray-800"
              >My Baking Addiction</span
            >. Please check out directions at their website.
          </p>
          <button
            class="bg-gradient-to-tl from-orange-400 to-orange-200 px-6 py-2 rounded-full text-white uppercase font-semibold text-sm hover:scale-105 flex flex-row items-center justify-center"
          >
            <span> Directions </span>
            <span class="font-bold text-lg">→</span>
          </button>
        </div>
    `;
  }

  _renderIngredient(ing) {
    return `
    <li class="flex flex-row items-center space-x-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        class="bi bi-check2 text-orange-400"
        viewBox="0 0 16 16"
      >
        <path
          d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"
        />
      </svg>
      <p class="text-gray-500 text-sm">
        <span class="quantity">${
          ing.quantity ? new Fraction(ing.quantity).toFraction(true) : ""
        } </span
        ><span class="unit"> ${ing.unit} </span>
        <span>${ing.description}</span>
      </p>
    </li>
    `;
  }
}

export default new RecipeView();

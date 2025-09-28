"use strict";
import View from "./view.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resPerPage
    );

    // 1) Page 1. and others
    if (curPage === 1 && numPages > 1) {
      return `
      <div>
      </div>
      <div>
        <button data-goto="${curPage + 1}"
          class="btn--inline pagination__btn flex flex-row items-center justify-center hover:translate-x-1"
        >
          Page ${curPage + 1}<span class="text-2xl pl-2">→</span>
        </button>
      </div>
      `;
    }

    // 2) Last Page
    if (curPage === numPages && numPages > 1) {
      return `
      <div>
        <button data-goto="${curPage - 1}"
          class="btn--inline pagination__btn flex flex-row items-center justify-center hover:-translate-x-1"
        >
          <span class="text-2xl pr-2">←</span>Page ${curPage - 1}
        </button>
      </div>
      <div>
      </div>
      `;
    }

    // 3) Other page
    if (curPage < numPages) {
      return `
      <div>
        <button data-goto="${curPage - 1}"
          class="btn--inline pagination__btn flex flex-row items-center justify-center hover:-translate-x-1"
        >
          <span class="text-2xl pr-2">←</span>Page ${curPage - 1}
        </button>
      </div>
      <div>
        <button data-goto="${curPage + 1}"
          class="btn--inline pagination__btn flex flex-row items-center justify-center hover:translate-x-1"
        >
          Page ${curPage + 1}<span class="text-2xl pl-2">→</span>
        </button>
      </div>
      `;
    }

    // 4) Only one page
    return "";
  }
}

export default new PaginationView();

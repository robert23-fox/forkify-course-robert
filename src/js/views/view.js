export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup; // code for previewView = to return the markup as a string

    this._clear();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Update changed TEXT nodes
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue?.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner() {
    const markup = `
     <div class="flex items-center justify-center h-screen w-full">
      <!-- Spinner -->
      <div
        class="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin 
              bg-gradient-to-r from-orange-400 to-orange-200"
        style="-webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 4px), #000 0); mask: radial-gradient(farthest-side, #0000 calc(100% - 4px), #000 0);"
      ></div>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div
      class="error__container flex flex-row items-center justify-center mt-10 space-x-5"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        fill="currentColor"
        class="bi bi-exclamation-triangle text-orange-700"
        viewBox="0 0 16 16"
      >
        <path
          d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"
        />
        <path
          d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"
        />
      </svg>
      <p class="text-orange-700 font-semibold">
        ${message}
      </p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div 
      class="message__container flex flex-row items-center justify-center mt-10 space-x-5"
    >
      <p class="text-green-700 font-semibold">
         ${message} 
      </p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }
}

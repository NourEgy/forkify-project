
// Import files Or Images of Videos
import icons from "/src/img/icons.svg"; // Parcel 1

export default class View {

    _data;

    /**
     * Render the received Object to the DOM
     * @param {Object| Obkect[]} data the data to be rendered (e.g. recipe) 
     * @param {boolean} [render=true] if false, create markup string instead of rendring to the DOM 
     * @returns {undefined | string} a markup string is returned if render=false
     * @this {object} View instance
     * @author NourEgy
     * @todo Finish Implementation
     */

    render(data, render = true) {

        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

        this._data = data;
        const markUp = this._genereteMarkup();
        if (!render) return markUp;

        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markUp);
    }

    update(data) {

        this._data = data;
        const newMarkUp = this._genereteMarkup();

        const newDOM = document.createRange().createContextualFragment(newMarkUp);
        const newElements = Array.from(newDOM.querySelectorAll("*"));
        const curElements = Array.from(this._parentElement.querySelectorAll("*"));
 
        newElements.forEach((newEl, i) => {
            const curEl = curElements[i];
            
            // Updates change Text
            if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
                curEl.textContent = newEl.textContent;
            }

            // Updates change Attributes
            if(!newEl.isEqualNode(curEl)) {
                Array.from(newEl.attributes).forEach(attr => {
                    curEl.setAttribute(attr.name, attr.value);
                });
            }
        });
    }


    _clear() {
        this._parentElement.innerHTML = ``;
    }

    renderSpinner() {
        const markUp = `
            <div class="spinner">
                <svg>
                <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markUp);
    }

    renderError(message = this._errorMessage) {
        const markUp = `
            <div class="error">
                <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
                </div>
                <p>${message}</p>
            </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markUp);
    }

    renderMessage(message = this._message) {
        const markUp = `
        <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markUp);
    }



}

//export default new View();
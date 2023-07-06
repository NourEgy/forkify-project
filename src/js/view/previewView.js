// Import files Or Images of Videos
import icons from "/src/img/icons.svg"; // Parcel 1
import View from "./view.js";

class previewView extends View {

    _parentElement = document.querySelector("ul.results");
    _errorMessage = 'No Recipe Found In Your Query! please try again.';
    _message = '';
    
    _genereteMarkup() {
        const id = window.location.hash.slice(1);
 
        return `<li class="preview">
            <a class="preview__link ${id === this._data.id ? 'preview__link--active' : ' '}" href="#${this._data.id}">
            <figure class="preview__fig">
                <img src="${this._data.image}" alt="${this._data.title}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${this._data.title}</h4>
                <p class="preview__publisher">${this._data.publisher}</p>   
                <div class="preview__user-generated ${this._data.key ? '' : 'hidden'}">
                    <svg>
                    <use href="${icons}#icon-user"></use>
                    </svg>
                </div>
            </div>
            </a>
        </li>`;
    }
    
}


export default new previewView();
// Import files Or Images of Videos
import icons from "/src/img/icons.svg"; // Parcel 1
import View from "./view.js";
import previewView from "./previewView.js";


class bookmarksView extends View {

    _parentElement = document.querySelector("ul.bookmarks__list");
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :).';
    _message = '';

    addHandlerRender(handler) {
        window.addEventListener("load", handler);
    }
    
    _genereteMarkup() {
        return this._data.map(bookmark => previewView.render(bookmark, false)).join("");
    }
    
}


export default new bookmarksView();
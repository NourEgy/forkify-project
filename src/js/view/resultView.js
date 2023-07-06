// Import files Or Images of Videos
import icons from "/src/img/icons.svg"; // Parcel 1
import View from "./view.js";
import previewView from "./previewView.js";

class resultView extends View {

    _parentElement = document.querySelector(".results");
    _errorMessage = 'No Recipe Found In Your Query! please try again.';
    _message = '';
    
    _genereteMarkup() {
        return this._data.map(bookmark => previewView.render(bookmark, false)).join("");
    }
   
}
export default new resultView();
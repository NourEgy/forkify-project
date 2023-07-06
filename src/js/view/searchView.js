// Import files Or Images of Videos
import icons from "/src/img/icons.svg"; // Parcel 1

class searchView {
    #parentEl = document.querySelector(".search");

    getQuery() {
        const value = this.#parentEl.querySelector(".search__field").value;
        this._clearInput();
        return value;
    }

    _clearInput() {
        this.#parentEl.querySelector(".search__field").value = '';
    }

    addHandlerSearch(handler) {
        this.#parentEl.addEventListener("submit", function(e) {
            e.preventDefault()
            handler();
        });
    }
    
}


export default new searchView();
/**
 * Created by pacman29 on 21.04.17.
 */
(function () {
    class baseView{

        constructor(){
            this._root = undefined;
        }

        get root() {
            return this._root;
        }
    }

    window.__space.baseView = baseView;
}());
/**
 * Created by pacman29 on 29.03.17.
 */
(function () {
    class Parser extends window.__space.baseParser{
        constructor(){
            super();
            this._checklist = ["json"];
        }
        json(){
            return new window.__space.JsonParser();
        }
        get(type){
            if(this._checklist.some(iter => {
                    return type === iter;
                })) {
                return this[type].call();
            } else {
                return undefined;
            }
        }
    }

    window.__space.Parser = Parser;
}());
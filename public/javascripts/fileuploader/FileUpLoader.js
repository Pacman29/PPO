/**
 * Created by pacman29 on 19.03.17.
 */
(function () {
    class FileUpLoader extends window.__space.baseFileUpLoader{
        constructor(){
            super();
            this._checklist = ["json"];
        }
        json(){
            return new window.__space.jsonFileUpLoader();
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

    window.__space.FileUpLoader = FileUpLoader;
}());
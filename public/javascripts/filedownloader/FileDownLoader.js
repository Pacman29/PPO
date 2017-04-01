/**
 * Created by pacman29 on 19.03.17.
 */
(function () {
    class FileDownLoader extends window.__space.baseFileDownLoader{
        constructor(){
            super();
            this._checklist = ["json"];
        }
        json(){
            return new window.__space.jsonFileDownLoader();
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

    window.__space.FileDownLoader = FileDownLoader;
}());
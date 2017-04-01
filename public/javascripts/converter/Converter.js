/**
 * Created by pacman29 on 30.03.17.
 */
(function () {
    class Converter extends window.__space.baseConverter{
        constructor(){
            super();
            this._checklist = ["json"];
        }
        json(){
            return new window.__space.ConverterFileJson();
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

    window.__space.Converter = Converter;
}());
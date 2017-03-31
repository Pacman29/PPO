/**
 * Created by pacman29 on 30.03.17.
 */
(function () {
    class baseConverter{
        constructor(){
        }

        json(){
            throw "Json is not impl";
        }

        get(type){
            return this[type].call();
        }
    }

    window.__space.baseConverter = baseConverter;
}());
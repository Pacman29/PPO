/**
 * Created by pacman29 on 19.03.17.
 */
(function () {
    class baseFileDownLoader{
        constructor(){

        }

        json(){
            throw "Json is not impl";
        }

        get(type){
            return this[type].call();
        }
    }

    window.__space.baseFileDownLoader = baseFileDownLoader;
}());
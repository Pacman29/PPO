/**
 * Created by pacman29 on 19.03.17.
 */
(function () {
    class baseFileUpLoader{
        constructor(){

        }

        json(){
            throw "Json is not impl";
        }

        get(type){
            throw "get is not impl";
        }
    }

    window.__space.baseFileUpLoader = baseFileUpLoader;
}());
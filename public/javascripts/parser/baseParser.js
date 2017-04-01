/**
 * Created by pacman29 on 30.03.17.
 */
(function () {
    class baseParser{
        constructor(){

        }

        json(){
            throw "Json is not impl";
        }

        get(type){
            throw "get is not impl";
        }
    }

    window.__space.baseParser = baseParser;
}());
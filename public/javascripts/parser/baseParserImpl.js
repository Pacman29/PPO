/**
 * Created by pacman29 on 30.03.17.
 */
(function () {
    class baseParserImpl{
        constructor(){

        }

        parseString(str){
            throw "parseString is not impl";
        }
    }

    window.__space.baseParserImpl = baseParserImpl;
}());
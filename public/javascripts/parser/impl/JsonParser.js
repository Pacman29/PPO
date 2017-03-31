/**
 * Created by pacman29 on 30.03.17.
 */
(function () {
    class JsonParser extends window.__space.baseParserImpl{
        constructor(){
            super();
        }

        parseString(str){
            return JSON.parse(str);
        }
    }

    window.__space.JsonParser = JsonParser;
}());
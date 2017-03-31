/**
 * Created by pacman29 on 30.03.17.
 */
(function () {
    class Converter extends window.__space.baseConverter{
        constructor(){}

        json(){
            return new window.__space.FromJsonConverter();
        }
    }

    window.__space.Converter = Converter;
}());
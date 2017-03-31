/**
 * Created by pacman29 on 29.03.17.
 */
(function () {
    class Parser extends window.__space.baseParser{
        constructor(Impl){
            super(Impl);
        }
    }

    window.__space.Parser = Parser;
}());
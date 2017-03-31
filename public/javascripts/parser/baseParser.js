/**
 * Created by pacman29 on 30.03.17.
 */
(function () {
    class baseParser{
        constructor(Impl){
            this._impl = Impl;
        }

        parseString(str){
            return this._impl.parseString(str);
        }

        setImpl(Impl){
            this.impl = Impl;
        }
    }

    window.__space.baseParser = baseParser;
}());
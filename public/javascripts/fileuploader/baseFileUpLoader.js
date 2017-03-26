/**
 * Created by pacman29 on 19.03.17.
 */
(function () {
    class baseFileUpLoader{
        constructor(Impl){
            this.impl = Impl;
        }

        loadFile(File,callback){
            return this.impl.loadFile(File,callback);
        }
    }

    window.__space.baseFileUpLoader = baseFileUpLoader;
}());
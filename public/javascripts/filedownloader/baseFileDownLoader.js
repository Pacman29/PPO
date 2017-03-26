/**
 * Created by pacman29 on 19.03.17.
 */
(function () {
    class baseFileDownLoader{
        constructor(Impl){
            this.impl = Impl;
        }

        downloadFile(text,name){
            return this.impl.downloadFile(text,name);
        }
    }

    window.__space.baseFileDownLoader = baseFileDownLoader;
}());
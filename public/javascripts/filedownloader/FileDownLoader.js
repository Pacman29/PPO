/**
 * Created by pacman29 on 19.03.17.
 */
(function () {
    class FileDownLoader extends window.__space.baseFileDownLoader{
        constructor(Impl){
            super(Impl);
        }

        setImpl(Impl){
            this.impl = Impl;
        }

    }

    window.__space.FileDownLoader = FileDownLoader;
}());
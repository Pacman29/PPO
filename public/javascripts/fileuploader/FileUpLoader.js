/**
 * Created by pacman29 on 19.03.17.
 */
(function () {
    class FileUpLoader extends window.__space.baseFileUpLoader{
        constructor(Impl){
            super(Impl);
        }
    }

    window.__space.FileUpLoader = FileUpLoader;
}());
/**
 * Created by pacman29 on 19.03.17.
 */
(function () {
    class FileDownLoader extends window.__space.baseFileDownLoader{
        constructor(){
            super();
        }
        json(){
            return new window.__space.jsonFileDownLoader();
        }
    }

    window.__space.FileDownLoader = FileDownLoader;
}());
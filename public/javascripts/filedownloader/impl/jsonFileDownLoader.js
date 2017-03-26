/**
 * Created by pacman29 on 19.03.17.
 */
(function(){
    class jsonFileDownLoader extends window.__space.baseFileDownLoaderImpl{
        constructor(){
            super();

        }

        downloadFile(text,name){
            var file = new File([text], name, {type: "text/plain;charset=utf-8"});
            saveAs(file);
        }

    }
    window.__space.jsonFileDownLoader = jsonFileDownLoader;
}());
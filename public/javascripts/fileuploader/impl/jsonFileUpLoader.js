/**
 * Created by pacman29 on 19.03.17.
 */
(function(){
    class jsonFileUpLoader extends window.__space.baseFileUpLoaderImpl{
        constructor(){
            super();
            this.reader = new FileReader();
        }

        loadFile(File,callback){
            this.reader.onload =  ((e) => {
                callback(e.target.result);
            });

            this.reader.readAsText(File);
        }

    }
    window.__space.jsonFileUpLoader = jsonFileUpLoader;
}());
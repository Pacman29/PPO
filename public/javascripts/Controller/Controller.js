/**
 * Created by pacman29 on 31.03.17.
 */
(function () {
    class Controller{
        constructor(Model,View){
            this._model = Model;
            this._view = View;
            this._filedownloader = new window.__space.FileDownLoader();
            this._converter = new window.__space.Converter();
        }

        uploadFile(filetype,file,callback){
            // TODO: set model

        }

        downloadFile(type, filename){
            //TODO: converter input to file

            let impl_converter = this._converter.get(type);

            let impl_downloader = this._filedownloader.get(type);
            impl_downloader.downloadFile(text,filename);
        }

    }
}());
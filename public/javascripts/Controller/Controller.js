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
            this._fileuploader = new window.__space.FileUpLoader();
            this._parser = new window.__space.Parser();
        }

        uploadFile(file){
            let type = file.name.slice(file.name.lastIndexOf('.')+1);
            let impl_uploader  = this._fileuploader.get(type);
            impl_uploader.loadFile(file,this.__afterloadfile);
        }

        downloadFile(filename){
            //TODO: converter input to file
            let type = filename.slice(filename.lastIndexOf('.')+1);
            let impl_converter = this._converter.get(type);

            let impl_downloader = this._filedownloader.get(type);
            impl_downloader.downloadFile(Department.getAllStudents() ,filename);
        }

        __afterloadfile(File,text){
            let type = File.name.slice(File.name.lastIndexOf('.')+1);
            let parser_impl = this._parser.get(type);
            let students = parser_impl.parseString(text);
            students.forEach(iter => {
                Department.addStudent(iter);
            })
        }

    }
}());
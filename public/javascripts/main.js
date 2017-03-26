/**
 * Created by pacman29 on 19.03.17.
 */
(function () {

    var btn_load = document.getElementById("btn_load");
    var btn_save = document.getElementById("btn_save");
    var btn_parse = document.getElementById("btn_parse");
    var textfield = document.getElementById("textfield");

    btn_load.addEventListener("change",(event) => {

        let loader = new window.__space.FileUpLoader(new window.__space.jsonFileUpLoader());

        let files = event.target.files;

        loader.loadFile(files[0],(text)=>{
            textfield.textContent = text;
        });

    });

    btn_save.addEventListener("click",(event) => {
        let loader = new window.__space.FileDownLoader(new window.__space.jsonFileDownLoader());
        loader.downloadFile("bla-bla","test.json");
    });

    btn_parse.addEventListener("click",(event) => {
       var obj = JSON.parse(textfield.textContent);
    });

}());
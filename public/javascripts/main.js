/**
 * Created by pacman29 on 19.03.17.
 */
(function () {
    var dept = new window.__space.Department();
    var group = new window.__space.Group();
    group.changeName("test_groupname");
    var group2 = new window.__space.Group();
    group2.changeName("test_groupname2");
    dept.addGroup(group);
    dept.addGroup(group2);
    debugger;
    var student = new window.__space.Student({
        Surname: "Surname",
        Name: "Name",
        SecondName: "SecondName",
        Rating: 0,
        Group: undefined
    });
    var student2 = new window.__space.Student({
        Surname: "Surname2",
        Name: "Name2",
        SecondName: "SecondName2",
        Rating: 0,
        Group: undefined
    });

    group.addStudent(student);
    student.setHead();
    group.addStudent(student2);

    student.view = window.__space.StudentView;
    student2.view = window.__space.StudentView;

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
       let parser = new window.__space.Parser(new window.__space.JsonParser());
       let converter = new window.__space.Converter(new window.__space.FromJsonConverter());

       let students = parser.parseString(textfield.textContent);

       students.forEach(iter => {
           converter.addStudent(iter);
       });

       let dept = new window.__space.Department(converter.getDepartment());
       debugger;
       document.getElementsByTagName("body")[0].appendChild(dept.node());
       debugger;
    });


    let app = document.createElement("table");
    let t = document.createElement("tbody");
    t.appendChild(student.view.root);
    t.appendChild(student2.view.root);
    app.appendChild(t);
    document.getElementsByTagName("body")[0].appendChild(app);
}());
/**
 * Created by pacman29 on 05.05.17.
 */
(function () {
     function fileloader (dept,event){
        let department = dept._department;

        let loader_fab = new window.__space.FileUpLoader();
        let loader = loader_fab.get("json");
        let files = event.target.files;
        var filetext = "";

        loader.loadFile(files[0],(text)=>{
            let parser_fab = new window.__space.Parser();
            let parser = parser_fab.get("json");
            let students = parser.parseString(text);

            students.forEach(student => {
                let group = department.getGroup(student.Group);
                if(group === undefined){
                    group = new window.__space.Group(student.Group);
                    group.view = window.__space.GroupView;
                    department.addGroup(group);
                }

                let newstudent = new window.__space.Student({
                    Surname: student.Surname,
                    Name: student.Name,
                    SecondName: student.SecondName,
                    Rating: student.Rating
                });
                newstudent.view = window.__space.StudentView;
                group.addStudent(newstudent);

                if(student.Role === "head"){
                    newstudent.setHead();
                }
            });
            department.view._readInfo();
        });




    }

    window.__space.fileloader = fileloader;

}());

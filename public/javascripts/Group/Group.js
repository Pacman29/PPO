/**
 * Created by pacman29 on 27.03.17.
 */
(function () {
    class ChangeGroupname_all extends window.__space.baseCommand{
        constructor(Students,name){
            super("ChangeGroupname_Gr");
            this.students = Students;
            this.name = name;
        }

        execute(){
            this.students.forEach(iter => {
                iter.set("Group",this.name);
            })
        };

        unexecute(){
            this.students.forEach(iter => {
                iter.undo();
            })
        };
    }

    class ChangeHead extends window.__space.baseCommand{
        constructor(Students,id){
            super("ChangeRole_Gr");
            this.students = Students;
            this.id = id || null;
            this.oldheadid = -1;
        }

        execute(){
            this.oldheadid = this.students.findIndex(item => {
                return item.get("Role") === "head";
            });
            debugger;
            if(this.oldheadid > -1){
                this.students[this.oldheadid].set("Role","student");
            }
            this.students[id].set("Role","head");
        }

        unexecute(){
            if(this.oldheadid > -1){
                this.students[this.oldheadid].set("Role","head");
            }
            this.students[id].set("Role","student");
        }
    }

    class DeleteStudent extends window.__space.baseCommand{
        constructor(Students,id){
            super("DeleteStudent_Gr");
            this.students = Students;
            this.id = id;
        }

        execute(){
            if( (this.id) < 0 || (id >= this.students.length)){
                return;
            }
            this._result = this.deletestudent = this.students[id];
            debugger;
            this.students.splice(id,1);
        }

        unexecute(){
            debugger;
            this.students.splice(id-1,0,this.deletestudent);
        }
    }

    class AddStudent extends window.__space.baseCommand{
        constructor(Students,student){
            super("AddStudent_Gr");
            this.students = Students;
            this.student = student;
        }

        execute(){
            this._result = this.students.push(this.student);
        }

        unexecute(){
            this.students.pop();
        }
    }

    class ChangeStudentField extends window.__space.baseCommand{
        constructor(Students,id,field,value){
            super("ChangeStudentField_Gr");
            this.students = Students;
            this.field = field;
            this.value = value;
            this.id = id;
        }

        execute(){
            if( (this.id) < 0 || (id >= this.students.length)){
                return;
            }

            this.students[this.id].set(this.field,this.value);
        }

        unexecute(){
            this.students[this.id].undo();
        }
    }

    class GetAllStudents extends window.__space.baseCommand{
        constructor(Students){
            super("GetAllStudents_Gr");
            this._students = Students;
        }

        execute(){
            let students = [];
            this._students.forEach(iter => {
                students.push(iter.get_field_copy());
            });
            return students;
        }
    }

    class Group extends window.__space.baseObject{
        constructor(opt){
            let tmp = new Array();
            opt.forEach(iter => {
                tmp.push(new window.__space.Student(iter));
            });
            super(tmp,"Group");
            this.havehead = this.fields.some(iter => {
                return iter.get("Role") === "head";
            });
            this._groupname = this.fields[0].get("Group");
        }

        setGroupname_all(name){
            if(name === this._groupname){
                return;
            }
            let command = new window.__space.GroupCommands["ChangeGroupname_all"](this.fields,name);
            command.execute();
            this._groupname = name;
            this.push_command(command);
        }

        get groupname() {
            return this._groupname;
        }

        addStudent(student_json){
            if(this.havehead){
                if(student_json["Role"] === "head"){
                    throw "Group "+this._groupname+" have head";
                }
                student_json["Role"] = "student";
            } else {
                if(student_json["Role"] === "head"){
                    student_json["Role"] = "head";
                    this.havehead = true;
                } else {
                    student_json["Role"] = "student";
                }
            }
            student_json["Group"] = this._groupname;
            let command = new window.__space.GroupCommands["AddStudent"](
                this.fields,new window.__space.Student(student_json));
            command.execute();
            this.push_command(command);
            return command.result();
        }

        deleteStudent(id){
            if( (id) < 0 || (id >= this.fields.length)){
                throw "id is incorrect";
            }

            if(this.fields[id]["Role"] === "head"){
                this.havehead = false;
            }

            let command = new window.__space.GroupCommands["DeleteStudent"](this.fields,id)
            command.execute();
            this.push_command(command);
            return command.result();
        }

        changeHead(id){
            let command = new window.__space.GroupCommands["ChangeHead"](this.fields,id)
            command.execute();
            this.push_command(command);
        }

        changeStudentField(id,fieldname,value){
            if( (id) < 0 || (id >= this.fields.length)){
                throw "id is incorrect";
            };
            if(fieldname === "Role"){
                if(value === "head"){
                    this.changeHead(id);
                }
                if(!(value === "student")){
                    throw "new role is incorrect";
                }
            };
            if(fieldname === "Group"){
                throw "you must delete this student and create in new group";
            };

            let command = new window.__space.GroupCommands["ChangeStudentField"](this.fields,id,fieldname,value);
            command.execute();
            this.push_command(command);
        }

        getAllStudents(){
            let command = new window.__space.GroupCommands["GetAllStudents"](this.fields);
            return command.execute();
        }

        _create_node(){
            let div = document.createElement("div");
            for(let i = 0; i<this.fields.length; ++i){
                let item = this.fields[i];
                let st = item.node();
                div.appendChild(st);
            }
            return div;
        }

        redraw(){
            return;
        }
    }

    window.__space.Group = Group;
    window.__space.GroupCommands = {ChangeGroupname_all: ChangeGroupname_all,
                                    AddStudent: AddStudent,
                                    DeleteStudent: DeleteStudent,
                                    ChangeHead: ChangeHead,
                                    ChangeStudentField: ChangeStudentField,
                                    GetAllStudents: GetAllStudents};
}());
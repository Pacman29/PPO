/**
 * Created by pacman29 on 27.03.17.
 */
(function () {
    class ChangeGroupname_all extends window.__space.baseCommand{
        constructor(Students,Group){
            super("ChangeGroupname_Gr");
            this._students = Students;
            this._group = Group;
        }

        execute(){

        };

        unexecute(){

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
    }

    window.__space.Group = Group;
    window.__space.GroupCommands = {ChangeGroupname_all: ChangeGroupname_all,
                                    AddStudent: AddStudent,
                                    DeleteStudent: DeleteStudent,
                                    ChangeHead: ChangeHead,
                                    ChangeStudentField: ChangeStudentField,
                                    GetAllStudents: GetAllStudents};
}());
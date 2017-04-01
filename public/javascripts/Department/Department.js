/**
 * Created by pacman29 on 29.03.17.
 */
(function () {
    class AddStudent extends window.__space.baseCommand{
        constructor(groups,id_grp,student_json){
            super("AddStudent_Dept");
            this._groups = groups;
            this._id_grp = id_grp;
            this._student = student_json;
            this._id_newst = null;
        }

        execute(){
            if((this._id_grp < 0) && (this._id_grp > this._groups.length)){
                throw "incorrect group id";
            }

            this._id_newst = this._groups[this._id_grp].addStudent(this._student);
        }

        unexecute(){
            debugger;
            this._groups[this._id_grp].undo();
        }
    }

    class DeleteStudent extends window.__space.baseCommand{
        constructor(groups,id_grp,id_st){
            super("DeleteStudent_Dept");
            this._groups = groups;
            this._id_grp = id_grp;
            this._id_st = id_st;
        }

        execute(){
            if((this._id_grp < 0) && (this._id_grp > this._groups.length)){
                throw "incorrect group id";
            }

            this._groups[this._id_grp].deleteStudent(this._id_st);
        }

        unexecute(){
            debugger;
            this._groups[this._id_grp].undo();
        }
    }

    class ChangeStudent extends window.__space.baseCommand{
        constructor(groups,id_grp,id_st,field,value){
            super("ChangeStudent_Dept");
            this._groups = groups;
            this._id_grp = id_grp;
            this._id_st = id_st;
            this._field = field;
            this._value = value;
        }

        execute(){
            if((this._id_grp < 0) && (this._id_grp > this._groups.length)){
                throw "incorrect group id";
            }

            this._groups[this._id_grp].changeStudentField(this._id_st,this._field,this._value);
        }

        unexecute(){
            debugger;
            this._groups[this._id_grp].undo();
        }
    }

    class ChangeGroupname extends window.__space.baseCommand{
        constructor(groups,id_grp,newname){
            super("ChangeGroupname_Dept");
            this._groups = groups;
            this._id_grp = id_grp;
            this._newname = newname;
        }

        execute(){
            if((this._id_grp < 0) && (this._id_grp > this._groups.length)){
                throw "incorrect group id";
            }
            this._groups[this._id_grp].setGroupname_all(this._newname);
        }

        unexecute(){
            debugger;
            this._groups[this._id_grp].undo();
        }
    }

    class DeleteGroup extends window.__space.baseCommand{
        constructor(groups,id_grp){
            super("DeleteGroup_Dept");
            this._groups = groups;
            this._id_grp = id_grp;
        }

        execute(){
            if((this._id_grp < 0) && (this._id_grp > this._groups.length)){
                throw "incorrect group id";
            }

            this._oldgroup = this._groups[this._id_grp];
            this._groups.splice(this._id_grp,1);
        }

        unexecute(){
            debugger;
            this._groups.splice(this._id_grp-1,0,this._oldgroup);
        }
    }

    class AddGroup extends window.__space.baseCommand{
        constructor(groups,group_json){
            super("AddGroup_Dept");
            this._groups = groups;
            this._group_json = group_json;
        }

        execute(){
            this._newid = this._groups.push(new window.__space.Group(this._group_json));
        }

        unexecute(){
            this._groups.splice(this._newid,1);
        }
    }

    class GetAllStudents extends window.__space.baseCommand{
        constructor(groups){
            super("GetAllStudents_Dept");
            this._groups = groups;
        }

        execute(){
            let students = [];
            debugger;
            this._groups.forEach(iter =>{
                let st = iter.getAllStudents();
                st.forEach(student => {
                    students.push(student);
                });
            });
            return students;
        }
    }

    class Department extends window.__space.baseObject{
        constructor(){
            super({},"Department");
        }
    }

    window.__space.Department = Department;
    window.__space.Department = Department;
    window.__space.DepartmentCommands = {
        AddStudent: AddStudent,
        DeleteStudent: DeleteStudent,
        ChangeStudent: ChangeStudent,
        ChangeGroupname: ChangeGroupname,
        DeleteGroup: DeleteGroup,
        AddGroup: AddGroup,
        GetAllStudents: GetAllStudents
    }
}());


/*
grps
[
    gr
    [
        st
        {
        }
        {
        }
    ]
]

 */
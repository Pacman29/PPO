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
                return;
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
                return;
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
                return;
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
                return;
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
            this._groups = groups;
            this._id_grp = id_grp;
        }

        execute(){
            if((this._id_grp < 0) && (this._id_grp > this._groups.length)){
                return;
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
        constructor(opt){
            let tmp = new Array();
            opt.forEach(iter => {
                tmp.push(new window.__space.Group(iter));
            });
            super(tmp,"Department");
        }

        addStudent(id_grp,student_json){
            if((id_grp < 0) && (id_grp > this._groups.length)){
                throw "incorrect group id";
            }
            let command = new window.__space.DepartmentCommands["AddStudent"](this.fields,id_grp,student_json);
            command.execute();
            this.push_command(command);
        }

        deleteStudent(id_grp,id_student){
            if((id_grp < 0) && (id_grp > this._groups.length)){
                throw "incorrect group id";
            }

            let command = new window.__space.DepartmentCommands["DeleteStudent"](this.fields,id_grp,id_student);
            command.execute();
            this.push_command(command);
        }

        changeStudent(id_grp,id_st,field,value){
            if((id_grp < 0) && (id_grp > this._groups.length)){
                throw "incorrect group id";
            }

            let command = new window.__space.DepartmentCommands["ChangeStudent"](this.fields,id_grp,id_st,field,value);
            command.execute();
            this.push_command(command);
        }

        changeGroupname(id_grp,newname){
            if((id_grp < 0) && (id_grp > this._groups.length)){
                throw "incorrect group id";
            }

            let command = new window.__space.DepartmentCommands["ChangeGroupname"](this.fields,id_grp,newname);
            command.execute();
            this.push_command(command);
        }

        deleteGroup(id_grp){
            if((id_grp < 0) && (id_grp > this._groups.length)){
                throw "incorrect group id";
            }

            let command = new window.__space.DepartmentCommands["DeleteGroup"](this.fields,id_grp);
            command.execute();
            this.push_command(command);
        }

        addGroup(group_json){
            let command = new window.__space.DepartmentCommands["AddGroup"](this.fields,group_json);
            command.execute();
            this.push_command(command);
        }

        getAllStudents(){
            let command = new window.__space.DepartmentCommands["GetAllStudents"](this.fields);
            return command.execute();
        }

        _create_node(){
            //<div id="my-collapse" data-component="collapse">

            //<h4><a href="#box-1" class="collapse-toggle">...</a></h4>
            //<div class="collapse-box hide" id="box-1"> body </div>
            let div = document.createElement("div");
            div.setAttribute("id","my-collapse");
            div.setAttribute("data-component","collapse");
            for(let i = 0; i < this.fields.length; ++i){
                let item = this.fields[i];
                let h3 = document.createElement("h3");
                h3.innerHTML = `<a href="#box-${i+1}" class="collapse-toggle">${item.groupname}</a>`;
                div.appendChild(h3);
                let div_inner = document.createElement("div");
                div_inner.setAttribute("class","collapse-box");
                div_inner.setAttribute("id",`box-${i+1}`);
                div_inner.appendChild(item.node());
                div.appendChild(div_inner);
            }
            return div;
        }

        redraw(){
            return;
        }

    }

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
/**
 * Created by pacman29 on 26.03.17.
 */
(function () {
    class ChangeGroup extends window.__space.baseCommand {
        constructor(NewGroup){
            super("ChangeGroup_St");
            this._new_group = NewGroup;
        }

        execute(obj){
            this._obj = obj;
            this._old_group = obj._getField("Group");
            this._is_head = this._obj === this._old_group._getHead();
            this._old_group._deleteStudent(this._obj);
            this._new_group._addStudent(obj);
        }

        unexecute(){
            this._new_group._deleteStudent(this._obj);
            this._old_group._addStudent(this._obj);
            if(this._is_head){
                this._old_group._setHead(this._obj);
            }
        }
    }

    class ChangeHead extends window.__space.baseCommand{
        constructor(){
            super("ChangeRole_St");
        }

        execute(obj){
            this._obj = obj;
            this._save_student = this._obj._getField("Group");
            this._obj._getField("Group")._setHead(this._obj);
        }

        unexecute(){
            this._obj._getField("Group")._setHead(this._obj);
        }
    }

    class DeleteStudent extends window.__space.baseCommand{
        constructor(){
            super("DeleteStudent_St");
        }

        execute(obj){
            this._obj = obj;
            this._group = obj._getField("Group");
            this._is_head = this._group._getHead() === this._obj;
            this._group._deleteStudent(this._obj);
        }

        unexecute(){
            this._group._addStudent(this._obj);
            if(this._is_head){
                this._group._setHead(this._obj);
            }
        }
    }

    class Set extends window.__space.baseCommand {
        constructor(field,value){
            super("Set_St");
            this._value = value;
            this._field = field;
        }

        execute(obj){
            this._obj = obj;
            this._save_value = obj.getField();
            obj._setField(this._field,this._value);
        }

        unexecute(){
            this._obj._setField(this._field,this._save_value);
        }
    }

    class Student extends window.__space.baseObject {
        constructor(opt) {
            super(opt || {
                    Surname: "",
                    Name: "",
                    SecondName: "",
                    Rating: 0,
                    Group: undefined
                }, "Student");

            this.ondelete = undefined;
            this.onchange = undefined;
            this.on = undefined;
        }

        execute(obj){
            let res = super.execute(obj);
            return res;
        }

        _setField(field,value){
            if(! field in  this.fields){
                throw "this field not in Student";
            }

            this.fields[field] = value;
        }

        _getField(field){
            if(! field in  this.fields){
                throw "this field not in Student";
            }

            return this.fields[field];
        }

        set(field, value){
            let set = new window.__space.StudentCommands["Set"](field,value);
            return this.execute(set);
        }

        get(field){
            return this._getField(field);
        }

        setHead(){
            let command = new window.__space.StudentCommands["ChangeHead"]();
            return this.execute(command);
        }

        changeGroup(Group){
            let command = new window.__space.StudentCommands["ChangeGroup"](Group);
            return this.execute(command);
        }

        delete(){
            let command = new window.__space.StudentCommands["DeleteStudent"]();
            return this.execute(command);
        }

        getJson(){
            let res = {};
            for(let key in this.fields){
                res[key] = this.fields[key];
            }
            return res;
        }

        copy(){
            return new Student(this.getJson());
        }

        static compare(a,b){
            if(a.get("Surname") > b.get("Surname")){
                return 1;
            }
            if(a.get("Surname") < b.get("Surname")){
                return -1;
            }
            if(a.get("Name") > b.get("Name")){
                return 1;
            }
            if(a.get("Name") < b.get("Name")){
                return -1;
            }
            if(a.get("SecondName") > b.get("SecondName")){
                return 1;
            }
            if(a.get("SecondName") < b.get("SecondName")){
                return -1;
            }
            return 0;

        }

    }

    window.__space.Student = Student;
    window.__space.StudentCommands = {Set,ChangeGroup,ChangeHead, DeleteStudent};

}());
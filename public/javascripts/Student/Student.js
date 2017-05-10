/**
 * Created by pacman29 on 26.03.17.
 */
(function () {
    class ChangeGroup extends window.__space.baseCommand {
        constructor(NewGroup,callobject){
            super("ChangeGroup_St",callobject);
            this._new_group = NewGroup;
        }

        execute(){
            this._old_group = this._callobject._getField("Group");
            this._is_head = this._callobject === this._old_group._getHead();
            this._old_group._deleteStudent(this._callobject);
            this._new_group._addStudent(this._callobject);
        }

        unexecute(){
            this._new_group._deleteStudent(this._callobject);
            this._old_group._addStudent(this._callobject);
            if(this._is_head){
                this._old_group._setHead(this._callobject);
            }
        }
    }

    class ChangeHead extends window.__space.baseCommand{
        constructor(callobject){
            super("ChangeHead_St",callobject);
        }

        execute(){
            this._save_student = this._callobject._getField("Group").head();
            this._callobject._getField("Group")._setHead(this._callobject);
        }

        unexecute(){
            this._callobject._getField("Group")._setHead(this._save_student);
        }
    }

    class DeleteStudent extends window.__space.baseCommand{
        constructor(callobject){
            super("DeleteStudent_St",callobject);
        }

        execute(){
            this._group = this._callobject._getField("Group");
            this._is_head = this._group._getHead() === this._callobject;
            this._group._deleteStudent(this._callobject);
        }

        unexecute(){
            this._group._addStudent(this._callobject);
            if(this._is_head){
                this._group._setHead(this._callobject);
            }
        }
    }

    class Set extends window.__space.baseCommand {
        constructor(field,value,callobject){
            super("Set_St",callobject);
            this._value = value;
            this._field = field;
        }

        execute(){
            this._save_value = this._callobject._getField(this._field);
            this._callobject._setField(this._field,this._value);
        }

        unexecute(){
            this._callobject._setField(this._field,this._save_value);
        }
    }

    class ChangeFields extends window.__space.baseGroupCommand{
        constructor(callobject){
            super("ChangeFields_St",callobject);
        }
    }

    class Student extends window.__space.baseObject {
        constructor(opt) {
            super(opt || {
                    Surname: "",
                    Name: "",
                    SecondName: "",
                    Rating: 0
                }, "Student");
            this.fields.Group = undefined;
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
            let set = new window.__space.StudentCommands["Set"](field,value,this);
            this.execute(set);
            if(this.fields.Group){
                this.fields.Group.getStudents().sort(window.__space.Student.compare);
            }
            if(this.fields.Group.view){
                this.fields.Group.view._readInfo();
            }
        }

        get(field){
            return this._getField(field);
        }

        isHead(){
            if(this._getField("Group") === undefined){
                return false;
            }
            let  res =  this === this._getField("Group").head();
            return res;
        }

        setHead(){
            let command = new window.__space.StudentCommands["ChangeHead"](this);
            return this.execute(command);
        }

        changeGroup(Group){
            let command = new window.__space.StudentCommands["ChangeGroup"](Group,this);
            return this.execute(command);
        }

        delete(){
            let command = new window.__space.StudentCommands["DeleteStudent"](this);
            this.execute(command);
            if(this.fields.Group){
                this.fields.Group.getStudents().sort(window.__space.Student.compare);
            }
            if(this.fields.Group.view){
                this.fields.Group.view._readInfo();
            }
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
            if(a.isHead() && b.isHead()){
                return 0;
            }
            if(a.isHead()){
                return -1;
            }
            if(b.isHead()){
                return 1;
            }

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

        changeFields(Surname,
                     Name,
                     SecondName,
                     Rating,
                     Head,
                     Group)
        {
            let commands = new ChangeFields();
            if(Surname && (Surname !== this.fields.Surname)){
                commands.add(new window.__space.StudentCommands["Set"]("Surname",Surname,this));
            }
            if(Name && (Name !== this.fields.Name)){
                commands.add(new window.__space.StudentCommands["Set"]("Name",Name,this));
            }
            if(SecondName && (SecondName !== this.fields.SecondName)){
                commands.add(new window.__space.StudentCommands["Set"]("SecondName",SecondName,this));
            }
            if(Rating && (Rating !== this.fields.Rating)){
                commands.add(new window.__space.StudentCommands["Set"]("Rating",Rating,this));
            }
            if(Group && (Group !== this.fields.Group)){
                commands.add(new window.__space.StudentCommands["ChangeGroup"](Group,this));
            }
            if((Head !== undefined) && (Head !== this.isHead())){
                commands.add(new window.__space.StudentCommands["ChangeHead"](this));
            }

            this.execute(commands);
            debugger;
            if(this.fields.Group){
                this.fields.Group.getStudents().sort(window.__space.Student.compare);
            }
            if(this.fields.Group.view){
                this.fields.Group.view._readInfo();
            }
        }

    }

    window.__space.Student = Student;
    window.__space.StudentCommands = {Set,ChangeGroup,ChangeHead, DeleteStudent};

}());
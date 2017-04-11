/**
 * Created by pacman29 on 26.03.17.
 */
(function () {
    class SetSurname extends window.__space.baseCommand {
        constructor(value){
            super("ChangeSurname_St");
            this._value = value;
        }

        execute(fields){
            this._fields = fields;
            this._save_value = this._fields["Surname"];
            this._fields["Surname"] = this._value;
        }

        unexecute(){
            this._fields["Surname"] = this._save_value;
        }
    }

    class SetName extends window.__space.baseCommand {
        constructor(value){
            super("ChangeName_St");
            this._value = value;
        }

        execute(fields){
            this._fields = fields;
            this._save_value = this._fields["Name"];
            this._fields["Name"] = this._value;
        }

        unexecute(){
            this._fields["Name"] = this._save_value;
        }
    }

    class SetSecondName extends window.__space.baseCommand {
        constructor(value){
            super("ChangeSecondName_St");
            this._value = value;
        }

        execute(fields){
            this._fields = fields;
            this._save_value = this._fields["SecondName"];
            this._fields["SecondName"] = this._value;
        }

        unexecute(){
            this._fields["SecondName"] = this._save_value;
        }
    }

    class SetRating extends window.__space.baseCommand {
        constructor(value){
            super("ChangeRating_St");
            this._value = value;
        }

        execute(fields){
            this._fields = fields;
            this._save_value = this._fields["Rating"];
            this._fields["Rating"] = this._value;
        }

        unexecute(){
            this._fields["Rating"] = this._save_value;
        }
    }

    class SetGroup extends window.__space.baseCommand {
        constructor(New_group){
            super("ChangeGroup_St");
            this._new_group = New_group;
        }

        execute(fields){
            this._fields = fields;
            this._save_value = this._fields["Group"];
            this._fields["Group"] = this._new_group;
        }

        unexecute(){
            this._fields["Group"] = this._save_value;
        }
    }

    class GetStudentJson extends window.__space.baseCommand {
        constructor(){
            super("GetStudent_St");
        }

        execute(fields){
            this._fields = fields;
            let res = {};
            res["Surname"] = this._fields["Surname"];
            res["Name"] = this._fields["Name"];
            res["SecondName"] = this._fields["SecondName"];
            res["Rating"] = this._fields["Rating"];
            let tmp = this._fields["Group"];
            if(tmp === undefined){
                res["Group"] = undefined;
                res["Role"] = "Student";
            } else {
                res["Group"] = tmp.name();
                res["Role"] = tmp.role();
            }

            return res;
        }

        unexecute(){

        }
    }

    class GetStudent extends window.__space.baseCommand {
        constructor(){
            super("GetStudent");
        }

        execute(fields){
            return new Student(fields);
        }

        unexecute(){

        }
    }

    class GetSurname extends window.__space.baseCommand {
        constructor(){
            super("GetSurname_St");
        }

        execute(fields){
            return fields["Surname"];
        }

        unexecute(){

        }
    }

    class GetName extends window.__space.baseCommand {
        constructor(){
            super("GetName_St");
        }

        execute(fields){
            return fields["Name"];
        }

        unexecute(){

        }
    }

    class GetSecondName extends window.__space.baseCommand {
        constructor(){
            super("GetSecondName_St");
        }

        execute(fields){
            return fields["SecondName"];
        }

        unexecute(){

        }
    }

    class GetRating extends window.__space.baseCommand {
        constructor(){
            super("GetRating_St");
        }

        execute(fields){
            return fields["Rating"];
        }

        unexecute(){

        }
    }

    class GetGroup extends window.__space.baseCommand {
        constructor(){
            super("GetGroup_St");
        }

        execute(fields){
            let tmp = fields["Group"];
            return (tmp === undefined) ? (undefined) : (tmp.name());
        }

        unexecute(){

        }
    }

    class GetRole extends window.__space.baseCommand {
        constructor(){
            super("GetRole_St");
        }

        execute(fields){
            let tmp = fields["Group"];
            return (tmp === undefined) ? ("Student") : (tmp.role());
        }

        unexecute(){

        }
    }

    class Student extends window.__space.baseObject {
        constructor(opt) {
            super(opt || {
                    Surname: "",
                    Name: "",
                    SecondName: "",
                    Rating: 0,
                    Group: undefined,
                    Role: undefined
                }, "Student");
        }


    }

    window.__space.Student = Student;
    window.__space.StudentCommands = {SetGroup,SetName,SetRating,SetSecondName,SetSurname,
    GetGroup, GetName, GetRating, GetRole, GetSurname, GetSecondName, GetStudent, GetStudentJson};
}());
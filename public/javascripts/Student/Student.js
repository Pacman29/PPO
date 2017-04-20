/**
 * Created by pacman29 on 26.03.17.
 */
(function () {
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

            this.onchange = undefined;
        }

        execute(obj){
            let res = super.execute(obj);
            if(this.onchange){
                this.onchange();
            }
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
    window.__space.StudentCommands = {Set};

}());
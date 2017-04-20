/**
 * Created by pacman29 on 27.03.17.
 */
(function () {
    class ChangeGroupname extends window.__space.baseCommand{
        constructor(name){
            super("ChangeGroupname_Gr");
            this._group_name = name;
        }

        execute(obj){
            this._obj = obj;
            this._save_group_name = obj._getGroupname();
            obj._setGroupname(this._group_name);
        };

        unexecute(){
            this._obj._setGroupname(this._save_group_name);
        };
    }

    class ChangeHead extends window.__space.baseCommand{
        constructor(Student){
            super("ChangeRole_Gr");
            this._student = Student;
        }

        execute(obj){
            this._obj = obj;
            this._save_student = obj._getHead();
            obj._setHead(this._student);
        }

        unexecute(){
            this._obj._setHead(this._save_student);
        }
    }

    class DeleteStudent extends window.__space.baseCommand{
        constructor(Student){
            super("DeleteStudent_Gr");
            this._student = Student;
            this._head = false;
        }

        execute(obj){
            this._obj = obj;
            if(obj._getHead() === this._student){
                this._head = true;
            }
            this._save_student = obj._deleteStudent(this._student);
        }

        unexecute(){
            this._obj._addStudent(this._save_student);
            if(this._head){
                this._obj._setHead(this._save_student);
            }
        }
    }

    class AddStudent extends window.__space.baseCommand{
        constructor(student){
            super("AddStudent_Gr");
            this.student = student;
        }

        execute(obj){
            this._obj = obj;
            return obj._addStudent(this.student);
        }

        unexecute(){
            this._obj._deleteStudent(this.student);
        }
    }

    class Group extends window.__space.baseObject{
        constructor(){
            let tmp = {
                _students: [],
                _head: undefined,
                _groupname: undefined,
                _department: undefined
            };

            super(tmp,"Group");
        }

        _setGroupname(name){
            this.fields._groupname = name;
        }

        _getGroupname(){
            return this.fields._groupname;
        }

        changeName(name){
            return this.execute(new window.__space.GroupCommands["ChangeGroupname"](name));
        }

        name(){
            return this._getGroupname();
        }

        _setHead(Student){
            let st = this.fields._students.find(iter => {
                return window.__space.Student.compare(iter,Student) === 0;
            });
            if(!st){
                throw "student not exist";
            }
            this.fields._head = st;
        }

        _getHead(){
            return this.fields._head;
        }

        changeHead(Student){
            return this.execute(new window.__space.GroupCommands["ChangeHead"](Student))
        }

        head(){
            return this.fields._head;
        }

        isHead(opt){
            if(typeof opt === "Number"){
                if(! opt in this.fields._students){
                    return undefined;
                }
                return opt === this._getHead();
            } else {
                return this.fields._students.findIndex(iter=>{
                    return iter.compare(opt);
                }) === this._getHead();
            }
        }

        _addStudent(Student){
            let check = this.fields._students.find(iter => {
                return window.__space.Student.compare(iter,Student) === 0;
            });
            if(check){
                throw "student already exist";
            }
            Student.setGroup(this);
            let id = this.fields._students.findIndex(iter => {
                    return window.__space.Student.compare(iter,Student) === 1;
                }) + 1;
            this.fields._students.splice(id,0,Student);
        }

        _deleteStudent(Student){
            let id = this.fields._groups.findIndex(iter => {
                return window.__space.Student.compare(iter,Student) === 0;
            });
            if(id === -1){
                throw "student not find";
            }
            if(Student === this.fields._head){
                this.fields._head = undefined;
            }
            this.fields._students[id].setGroup(undefined);
            return this.fields._students.splice(id,1)[0];
        }

        addStudent(student){
            return this.execute(new window.__space.GroupCommands["AddStudent"](student));
        }

        deleteStudent(student){
            return this.execute(new window.__space.GroupCommands["DeleteStudent"](student));
        }

        getJson(){
            let tmp = [];
            for(let i in this.fields._students){
                let tmp_st = this.fields._students[i].getJson();
                tmp_st.Group = this._getGroupname();
                tmp_st.Role =  (this.isHead(i)) ? "Head" : "Student";
                tmp.push(tmp_st);
            }
            return tmp;
        }

        getStudent(Name,Surname,SecondName){
            return this.fields._students.find(iter => {
                return iter.get("Name") === Name &&
                        iter.get("Surname") === Surname &&
                        iter.get("SecondName") === SecondName;
            });
        }

        getStudents(){
            return this.fields._students;

        }

        static compare(a,b){
            let a_name = a._getGroupname();
            let b_name = b._getGroupname();
            if(a_name > b_name){
                return 1;
            }
            if(a_name < b_name){
                return -1;
            }
            return 0;
        }

        setDepartment(Dept){
            this.fields._department = Dept;
        }

        getDepartment(){
            return this.fields._department;
        }

    }

    window.__space.Group = Group;
    window.__space.GroupCommands = {ChangeGroupname,
                                    AddStudent,
                                    DeleteStudent,
                                    ChangeHead}
}());
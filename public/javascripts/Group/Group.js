/**
 * Created by pacman29 on 27.03.17.
 */
(function () {
    class ChangeGroupname extends window.__space.baseCommand{
        constructor(name,callobject){
            super("ChangeGroupname_Gr",callobject);
            this._group_name = name;
        }

        execute(){
            this._save_group_name = this._callobject._getGroupname();
            this._callobject._setGroupname(this._group_name);
        };

        unexecute(){
            this._callobject._setGroupname(this._save_group_name);
        };
    }


    class AddStudent extends window.__space.baseCommand{
        constructor(student,callobject){
            super("AddStudent_Gr",callobject);
            this.student = student;
        }

        execute(){
            return this._callobject._addStudent(this.student);
        }

        unexecute(){
            this._callobject._deleteStudent(this.student);
        }
    }

    class DeleteGroup extends window.__space.baseCommand {
        constructor(callobject){
            super("DeleteGroup_Gr",callobject);
        }

        execute(){
            this._student = this._callobject.getDepartment();
            this._student._deleteGroup(this._callobject);
        }

        unexecute(){
            this._student._addGroup(this._callobject);
        }
    }

    class Group extends window.__space.baseObject{
        constructor(name = undefined){
            let tmp = {
                _students: [],
                _head: undefined,
                _groupname: "undefined",
                _student: undefined
            };

            if(typeof name === "string"){
                tmp._groupname = name;
            }

            super(tmp,"Group");
        }

        _setGroupname(name){
            this.fields._groupname = name;
        }

        _getGroupname(){
            return this.fields._groupname;
        }

        changeName(name){
            if(name === this.fields._groupname){
                return;
            }
            let test = name in this.fields._student.getGroupsName();
            if(this.fields._student.getGroupsName().find((iter) => {
                return name === iter;
                })){
                return;
            }
            this.execute(new window.__space.GroupCommands["ChangeGroupname"](name,this));
            let dep_view = this.fields._student.view;
            if(this.fields._student){
                this.fields._student.groups.sort(window.__space.Group.compare);
            }
            if(dep_view){
                dep_view._readInfo();
            }
        }

        get name(){
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
            this.fields._students.sort(window.__space.Student.compare);
            if(this._view){
                this._view._readInfo();
            }
        }

        _getHead(){
            return this.fields._head;
        }

        head(){
            return this.fields._head;
        }

        isHead(opt){
            if(typeof opt === "number"){
                if(! opt in this.fields._students){
                    return undefined;
                }
                return this.fields._students[opt] === this._getHead();
            } else {
                return this.fields._students.findIndex(iter=>{
                    return iter.compare(opt);
                }) === this._getHead();
            }
        }

        _addStudent(Student){
            debugger;
            let check = this.fields._students.find(iter => {
                return window.__space.Student.compare(iter,Student) === 0;
            });
            if(check){
                throw "student already exist";
            }
            Student._setField("Group",this);
            let id = this.fields._students.findIndex(iter => {
                    return window.__space.Student.compare(iter,Student) === -1;
                }) + 1;
            this.fields._students.splice(id,0,Student);
            this.fields._students.sort(window.__space.Student.compare);
            if(this._view){
                this._view._readInfo();
            }
        }

        _deleteStudent(Student){
            let id = this.fields._students.findIndex(iter => {
                return window.__space.Student.compare(iter,Student) === 0;
            });
            if(id === -1){
                throw "student not find";
            }
            if(Student === this.fields._head){
                this.fields._head = undefined;
            }
            this.fields._students.splice(id,1);
            this.fields._students.sort(window.__space.Student.compare);
            if(this._view){
                this._view._readInfo();
            }
        }

        addStudent(student){
            return this.execute(new window.__space.GroupCommands["AddStudent"](student,this));
        }

        getMaxRating(){
            if(this.fields._students.length === 0){
                return undefined;
            }
            let max = 0;
            this.fields._students.forEach(iter => {
                let tmp = iter.get("Rating");
                if(tmp > max){
                    max = tmp;
                }
            });
            return max;
        }

        getMinRating(){
            if(this.fields._students.length === 0){
                return undefined;
            }
            let min = 100;
            this.fields._students.forEach(iter => {
                let tmp = iter.get("Rating");
                if(tmp < min){
                    min = tmp;
                }
            });
            return min;
        }

        getAvarageRating(){
            if(this.fields._students.length === 0){
                return undefined;
            }
            let rating_sum = 0;
            this.fields._students.forEach(iter => {
               rating_sum += iter.get("Rating");
            });
            return rating_sum / this.fields._students.length;
        }

        getCount(){
            return this.fields._students.length;
        }

        getJson(){
            let tmp = [];
            for(let i in this.fields._students){
                let tmp_st = this.fields._students[i].getJson();
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

        get students(){
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
            this.fields._student = Dept;
        }

        getDepartment(){
            return this.fields._student;
        }

        delete(){
            this.execute(new window.__space.GroupCommands["DeleteGroup"](this));
            if(this.fields._student){
                this.fields._student.groups.sort(window.__space.Group.compare);
            }
            let dep_view = this.fields._student.view;
            if(dep_view){
                dep_view._readInfo();
            }
        }

    }

    window.__space.Group = Group;
    window.__space.GroupCommands = {ChangeGroupname,
                                    AddStudent, DeleteGroup};
}());
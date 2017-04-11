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
        constructor(id){
            super("ChangeRole_Gr");
            this._id = id;
        }

        execute(obj){
            this._obj = obj;
            this._save_id = obj._getHead(this._id);
            return obj._setHead(this._id);
        }

        unexecute(){
            this._obj._setHead(this._save_id);
        }
    }

    class DeleteStudent extends window.__space.baseCommand{
        constructor(opt){
            super("DeleteStudent_Gr");
            this._opt = opt;
        }

        execute(obj){
            this._obj = obj;
            this._save_head = obj._getHead();
            this._save_student = obj._deleteStudent(opt);
            return this._save_student;
        }

        unexecute(){
            this._obj._addStudent(this._save_student);
            this._obj._setHead(this._save_head);
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
        constructor(opt){
            let tmp = opt || {
                _students: [],
                _head: undefined,
                _groupname: undefined
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

        _setHead(id){
            if((id >= this.fields._students.length) || id<0){
                throw "id is incorrect";
            }

            this.fields._head = id;
        }

        _getHead(){
            return this.fields._head;
        }

        changeHead(id){
            return this.execute(new window.__space.GroupCommands["ChangeHead"](id))
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

        _addStudent(opt){
            let id = this.fields._students.findIndex(iter => {
                    return iter.compare(opt);
                }) || null;

            if(id){
                throw "Student already exist";
            }
            return this.fields._students.push(new window.__space.Student(opt)) - 1;
        }

        _deleteStudent(opt){
            let id = this.fields._students.findIndex(iter => {
                return iter.compare(opt);
            }) || null;

            if(id){
                if(id === this._getHead()){
                    this.fields._head = null;
                }
                return this.fields._students.splice(id,1)[0].getJson();
            }
            return null;
        }

        addStudent(opt){
            return this.execute(new window.__space.GroupCommands["AddStudent"](opt));
        }

        deleteStudent(opt){
            return this.execute(new window.__space.GroupCommands["DeleteStudent"](opt));
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

        getStudent(opt){
            if(typeof opt === "Number"){
                if(! opt in this.fields._students){
                    return undefined;
                }
                return this.fields._students[opt];
            } else {
                return this.fields._students.find(iter=>{
                    return iter.compare(opt);
                });
            }
        }

        getStudents(){
            return this.fields._students.map(iter=> {
                return iter.getJson();
            })
        }

        compare(name){
            return name === this.fields._groupname;
        }

    }

    window.__space.Group = Group;
    window.__space.GroupCommands = {ChangeGroupname,
                                    AddStudent,
                                    DeleteStudent,
                                    ChangeHead}
}());
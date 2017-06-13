/**
 * Created by pacman29 on 29.03.17.
 */
(function () {
    class AddGroup extends window.__space.baseCommand {
        constructor(Group,callobject){
            super("AddGroup_Gr",callobject);
            this._student = Group;
        }

        execute(){
            this._callobject._addGroup(this._student);
        }

        unexecute(){
            this._callobject._deleteGroup(this._student);
        }
    }

    class Department extends window.__space.baseObject{
        constructor(){
            super({_groups:[]},"Department");
        }

        get groups(){
            return this.fields._groups;
        }

        get count(){
            return this.fields._groups.length;
        }

        _addGroup(Group){
            let check = this.fields._groups.find(iter => {
                return window.__space.Group.compare(iter,Group) === 0;
            });
            if(check){
                throw "group already exist";
            }
            Group.setDepartment(this);
            let id = this.fields._groups.findIndex(iter => {
                return window.__space.Group.compare(iter,Group) === -1;
            }) + 1;
            this.fields._groups.splice(id,0,Group);
            this.fields._groups.sort(window.__space.Group.compare);
            if(this.view){
                this.view._readInfo();
            }
        }

        _deleteGroup(Group){
            let id = this.fields._groups.findIndex(iter => {
                return window.__space.Group.compare(iter,Group) === 0;
            });
            if(id === -1){
                throw "group not find";
            }
            this.fields._groups.splice(id,1);
            this.fields._groups.sort(window.__space.Group.compare);
            if(this.view){
                this.view._readInfo();
            }
        }

        addGroup(group){
            return this.execute(new window.__space.DepartmentCommands["AddGroup"](group,this));
        }

        getGroup(Name){
            return this.fields._groups.find(iter => {
                return iter.name === Name;
            });
        }

        getStudents(){
            let tmp = [];
            this.fields._groups.forEach(iter => {
                iter.getStudents().forEach( iter_st => {
                    tmp.push(iter_st);
                } )
            });
            return tmp;
        }

        getGroupsName(){
            return this.fields._groups.map((curr,index,arr) => {
                return curr.name;
            })
        }

        getJson(){
            let result = [];
            this.fields._groups.forEach(iter => {
                result.push(iter.getJson());
            });
            return result;
        }
    }

    window.__space.Department = Department;
    window.__space.DepartmentCommands = {AddGroup};
}());


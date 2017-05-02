/**
 * Created by pacman29 on 29.03.17.
 */
(function () {
    class AddGroup extends window.__space.baseCommand {
        constructor(Group){
            super("AddGroup_Gr");
            this._group = Group;
        }

        execute(obj){
            this._obj = obj;
            obj._addGroup(this._group);
        }

        unexecute(){
            this._obj._deleteGroup(this._group);
        }
    }

    class Department extends window.__space.baseObject{
        constructor(){
            super({_groups:[]},"Department");
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
                return window.__space.Group.compare(iter,Group) === 1;
            }) + 1;
            this.fields._groups.splice(id,0,Group);
        }

        _deleteGroup(Group){
            let id = this.fields._groups.findIndex(iter => {
                return window.__space.Group.compare(iter,Group) === 0;
            });
            if(id === -1){
                throw "group not find";
            }
            this.fields._groups[id].setDepartment(undefined);
            return this.fields._groups.splice(id,1)[0];
        }

        addGroup(group){
            return this.execute(new window.__space.DepartmentCommands["AddGroup"](group));
        }

        deleteGroup(group){
            return this.execute(new window.__space.DepartmentCommands["DeleteGroup"](group));
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
    }

    window.__space.Department = Department;
    window.__space.DepartmentCommands = {AddGroup};
}());


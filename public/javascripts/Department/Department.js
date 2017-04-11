/**
 * Created by pacman29 on 29.03.17.
 */
(function () {
    class AddGroup extends window.__space.baseCommand {
        constructor(group){
            super("AddGroup_Gr");
            this._group = group;
        }

        execute(obj){
            this._obj = obj;
            this._save_id = obj._addGroup(this._group);
        }

        unexecute(){
            this._obj._deleteGroup(this._save_id);
        }
    }

    class DeleteGroup extends window.__space.baseCommand {
        constructor(id){
            super("AddGroup_Gr");
            this._id = id;
        }

        execute(obj){
            this._obj = obj;
            this._save_group = obj._deleteGroup(this._id);
        }

        unexecute(){
            this._obj._addGroup(this._save_group);
        }
    }

    class Department extends window.__space.baseObject{
        constructor(opt){
            let tmp = opt || {
                _groups: []
                };
            super(tmp,"Department");
        }

        _addGroup(group){
            return this.fields._groups.push(group) -1;
        }

        _deleteGroup(id){
            if(id in this.fields._groups){
                return this.fields._groups.splice(id,1);
            }
        }

        addGroup(group){
            return this.execute(new window.__space.DepartmentCommands["AddGroup"](group));
        }

        deleteGroup(id){
            return this.execute(new window.__space.DepartmentCommands["DeleteGroup"](id));
        }

        getGroup(opt){
            if(typeof opt === "Number") {
                if (opt in this.fields._group) {
                    return this.fields._group[id];
                }
                return undefined;
            } else {
                return this.fields._groups.find(iter => {
                    return iter.compare(opt);
                });
            }
        }
    }

    window.__space.Department = Department;
    window.__space.DepartmentCommands = {AddGroup, DeleteGroup}
}());


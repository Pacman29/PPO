/**
 * Created by pacman29 on 27.03.17.
 */
(function () {
    class ChangeGroupname_all extends window.__space.baseCommand{
        constructor(Students,name){
            super("ChangeGroupname");
            this.students = Students;
            this.name = name;
        }

        execute(){
            this.students.forEach(iter => {
                iter.set("Group",this.name);
            })
        };

        unexecute(){
            this.students.forEach(iter => {
                iter.undo();
            })
        };
    }

    class ChangeHead extends window.__space.baseCommand{
        constructor(Students,id){
            super("ChangeRole");
            this.students = Students;
            this.id = id || null;
            this.oldheadid = -1;
        }

        execute(){
            this.oldheadid = this.students.findIndex(item => {
                return item.get("Role") === "head";
            });
            debugger;
            if(this.oldheadid === -1){
                return;
            }

            this.students.get(this.oldheadid).set("Role","student");
            this.students.get(id).set("Role","head");
        }

        unexecute(){
            if(this.oldheadid === -1){
                return;
            }
            this.students.get(this.oldheadid).set("Role","head");
            this.students.get(id).set("Role","student");
        }
    }


    class Group extends window.__space.baseObject{
        constructor(opt){
            let tmp = new Array();
            opt.forEach(iter => {
                tmp.push(new window.__space.Student(iter));
            });

            super(tmp,"Group");
            this.groupname = this.fields[0].get("Group");
        }

        setGroupname_all(name){
            if(name === this.groupname){
                return;
            }
            let command = new window.__space.GroupCommands["ChangeGroupname_all"](this.fields,name);
            command.execute();
            this.groupname = name;
            this.undo_stack.push(command);
            if(this.redo_stack.length > 0){
                this.redo_stack.splice(0,this.redo_stack.length);
            }
        }
    }

    window.__space.Group = Group;
    window.__space.GroupCommands = {ChangeGroupname_all: ChangeGroupname_all};
}());
/**
 * Created by pacman29 on 27.03.17.
 */
(function () {
    class baseObject{
        constructor(opt,objname){
            this.undo_stack = new window.__space.UndoStack();
            this.redo_stack = new window.__space.RedoStack();
            this.fields = opt || {};
            this.objname = objname;
            console.log("Create "+this.objname);
        }

        execute_without_save(command){
            return command.execute(this);
        }

        execute(command){
            debugger;
            let res = command.execute(this);
            this.push_command(command);
            return res;
        }

        undo(){
            if(this.undo_stack.length === 0) {
                return;
            }
            let command = this.undo_stack.pop();
            command.unexecute();
            this.redo_stack.push(command);
        }

        redo(){
            if(this.redo_stack.length === 0){
                return;
            }
            let command = this.redo_stack.pop();
            command.execute();
            this.undo_stack.push(command);
        }

        push_command(command){
            this.undo_stack.push(command);
            if(this.redo_stack.length > 0){
                this.redo_stack.splice(0,this.redo_stack.length);
            }
        }
    }

    window.__space.baseObject = baseObject;
}());
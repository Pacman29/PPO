/**
 * Created by pacman29 on 27.03.17.
 */
(function () {
    class baseObject{
        constructor(opt,objname){
            this.undo_stack = new Array();
            this.redo_stack = new Array();
            this.fields = opt;
            this.objname = objname;
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
    }

    window.__space.baseObject = baseObject;
}());
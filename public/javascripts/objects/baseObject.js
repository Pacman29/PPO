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
            this.objnode = this._create_node();
            console.log("Create "+this.objname);
        }

        undo(){
            if(this.undo_stack.length === 0) {
                return;
            }
            let command = this.undo_stack.pop();
            command.unexecute();
            this.redraw();
            this.redo_stack.push(command);
        }

        redo(){
            if(this.redo_stack.length === 0){
                return;
            }
            let command = this.redo_stack.pop();
            command.execute();
            this.redraw();
            this.undo_stack.push(command);
        }

        push_command(command){
            this.redraw();
            this.undo_stack.push(command);
            if(this.redo_stack.length > 0){
                this.redo_stack.splice(0,this.redo_stack.length);
            }
        }

        redraw(){
            throw "redraw is not impl";
        }

        node(){
            return this.objnode;
        }

        _create_node(){
            throw "redraw is not impl";
        }
    }

    window.__space.baseObject = baseObject;
}());
/**
 * Created by pacman29 on 12.04.17.
 */
(function () {
    class CommandStack{
        constructor(){
            this._stack = new Array();
        }

        push(opt){
            return this._stack.push(opt);
        }

        pop(){
            return this._stack.pop();
        }
    }


    class UndoStack extends CommandStack{
        constructor(){
            if(UndoStack.__instance){
                return UndoStack.__instance;
            }
            super();
            UndoStack.__instance = this;
        }
    }

    class RedoStack extends CommandStack{
        constructor(){
            if(RedoStack.__instance){
                return RedoStack.__instance;
            }
            super();
            RedoStack.__instance = this;
        }
    }

    window.__space.UndoStack = UndoStack;
    window.__space.RedoStack = RedoStack;
}());
/**
 * Created by pacman29 on 20.03.17.
 */

(function () {
    class baseCommand{

        constructor(commandname){
            this._commandname = commandname || "baseCommand";
            this._result = null;
            console.log(this.commandname);
        }
        get commandname() {
            return this._commandname;
        }
        execute(obj){
            throw "Execute not implements";
        };
        unexecute(){
            throw "unExecute not implements";
        };

        get result(){
            return this._result;
        }
    }

    class baseGroupCommand extends baseCommand{
        constructor(commandname){
            super(commandname || "baseGroupCommand");
            this._result = [];
            this._commands =[];
        }

        add(command){
            this._commands.push(command);
        }

        execute(obj){
            if(this._commands.length === 0){
                throw "No commands to execute";
            } else {
                this._commands.forEach(iter => {
                    iter.execute(obj);
                    this._result.push(iter.result);
                });
            }
        };

        unexecute(obj){
            if(this._commands.length === 0){
                throw "No commands to unexecute";
            } else {
                this._commands.forEach(iter => {
                    iter.unexecute();
                });
            }
        };
    }

    window.__space.baseCommand = baseCommand;
    window.__space.baseGroupCommand = baseGroupCommand;
}());
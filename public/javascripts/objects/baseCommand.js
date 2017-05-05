/**
 * Created by pacman29 on 20.03.17.
 */

(function () {
    class baseCommand{

        constructor(commandname,callobject){
            this._commandname = commandname || "baseCommand";
            this._callobject = callobject;
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
        constructor(commandname,callobject){
            super(commandname || "baseGroupCommand",callobject);
            this._result = [];
            this._commands =[];
        }

        add(command){
            this._commands.push(command);
        }

        execute(){
            if(this._commands.length === 0){
                throw "No commands to execute";
            } else {
                this._commands.forEach(iter => {
                    iter.execute();
                    this._result.push(iter.result);
                });
            }
        };

        unexecute(){
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
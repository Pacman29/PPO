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
        execute(){
            throw "Execute not implements";
        };
        unexecute(){
            throw "unExecute not implements";
        };

        get result(){
            return this._result;
        }
    }

    window.__space.baseCommand = baseCommand;
}());
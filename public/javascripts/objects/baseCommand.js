/**
 * Created by pacman29 on 20.03.17.
 */

(function () {
    class baseCommand{

        constructor(commandname){
            this._commandname = commandname || "baseCommand";
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
    }

    window.__space.baseCommand = baseCommand;
}());
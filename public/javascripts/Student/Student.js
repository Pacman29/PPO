/**
 * Created by pacman29 on 26.03.17.
 */
(function () {
    class ChangeField extends window.__space.baseCommand{
    constructor(fields,change_field,value){
        super("ChangeField");
        this.fields = fields;
        this.change_field = change_field;
        this.value = value;
        console.log(this.change_field.toString()+" "+this.value.toString());
    }

    execute(){
        this.save_value = this.fields[this.change_field];
        this.fields[this.change_field] = this.value;
    }
    unexecute(){
        this.fields[this.change_field] = this.save_value;
    }
    }

    class Student extends window.__space.baseObject{
      constructor(opt){
          super(opt || {
                  Surname: "",
                  Name: "",
                  SecondName: "",
                  Rating: 0,
                  Group: "",
                  Role: ""
              },"Student");
      }

        set(field,value){
            if((field in this.fields) === false){
                throw field+ " is not in "+ this.objname;
            }

            if(value === this.fields[field]){
                return;
            }
            let command = new window.__space.StudentCommands["ChangeField"](this.fields,field,value);
            command.execute();
            this.undo_stack.push(command);
            if(this.redo_stack.length > 0){
                this.redo_stack.splice(0,this.redo_stack.length);
            }
        }

        get(field){
            if((field in this.fields) === false){
                throw "The field "+field+" is not in "+ this.objname;
            }

            return this.fields[field];
        }

        get_field_copy(){
            let fields = {};
            for(let key in this.fields){
                fields[key] = this.fields[key];
            }
            return fields;
        }
    }

    window.__space.Student = Student;
    window.__space.StudentCommands = {ChangeField: ChangeField};
}());
/**
 * Created by pacman29 on 26.03.17.
 */
(function () {
    class ChangeField extends window.__space.baseCommand {
        constructor(fields, change_field, value) {
            super("ChangeField_St");
            this.fields = fields;
            this.change_field = change_field;
            this.value = value;
            console.log(this.change_field.toString() + " " + this.value.toString());
        }

        execute() {
            this.save_value = this.fields[this.change_field];
            this.fields[this.change_field] = this.value;
        }

        unexecute() {
            this.fields[this.change_field] = this.save_value;
        }
    }

    class Student extends window.__space.baseObject {
        constructor(opt) {
            super(opt || {
                    Surname: "",
                    Name: "",
                    SecondName: "",
                    Rating: 0,
                    Group: "",
                    Role: "student"
                }, "Student");
        }

        set(field, value) {
            if ((field in this.fields) === false) {
                throw field + " is not in " + this.objname;
            }

            if (value === this.fields[field]) {
                return;
            }
            let command = new window.__space.StudentCommands["ChangeField"](this.fields, field, value);
            command.execute();
            this.push_command(command);
        }

        get(field) {
            if ((field in this.fields) === false) {
                throw "The field " + field + " is not in " + this.objname;
            }

            return this.fields[field];
        }

        get_field_copy() {
            let fields = {};
            for (let key in this.fields) {
                fields[key] = this.fields[key];
            }
            return fields;
        }

        _create_node(){
            let div = document.createElement("div");
            for(let key in this.fields){
                let p = document.createElement("p");
                p.setAttribute("id",key.toString());
                p.textContent = this.fields[key];
                div.appendChild(p);
            }
            return div;
        }

        redraw(){
            let ps = div.getElementsByTagName("p");
            ps.forEach(iter => {
                iter.textContent = this.fields[iter.getAttribute("id").toString()].toString();
            });
        }
    }

    window.__space.Student = Student;
    window.__space.StudentCommands = {ChangeField: ChangeField};
}());
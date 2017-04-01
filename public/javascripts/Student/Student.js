/**
 * Created by pacman29 on 26.03.17.
 */
(function () {
    class ChangeField extends window.__space.baseCommand {
        constructor(change_field, value) {
            super("ChangeField_St");
            this.change_field = change_field;
            this.value = value;
            console.log(this.change_field.toString() + " " + this.value.toString());
        }

        execute(fields) {
            this.fields = fields;
            this.save_value = this.fields[this.change_field];
            this.fields[this.change_field] = this.value;
        }

        unexecute() {
            this.fields[this.change_field] = this.save_value;
        }
    }

    class Student extends window.__space.baseObject {
        constructor(opt) {
            super(opt, "Student");
        }
    }

    window.__space.Student = Student;
    window.__space.StudentCommands = {ChangeField: ChangeField};
}());
/**
 * Created by pacman29 on 30.03.17.
 */
(function () {
    class ConverterFileJson extends window.__space.baseConverterImpl{
        constructor(){
            super();
            this._groups = [];
        }

        addStudent(student){
            if((this._groups.length === 0) ||
                (!this._groups.some(iter =>{
                    return iter[0]["Group"] === student["Group"];
                }))){
                this._groups.push(new Array(student));
            } else {
                this._groups.find(iter => {
                    return iter[0]["Group"] === student["Group"];
                }).push(student);
            }
        }

        getDepartment(){
            return this._groups;
        }

        DepartmenttoFile(Department){
            return Department.getAllStudents();
        }
    }

    window.__space.FromJsonConverter = ConverterFileJson;
}());
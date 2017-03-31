/**
 * Created by pacman29 on 30.03.17.
 */
(function () {
    class baseConverterImpl{
        addStudent(student){
            throw "addStudent is not impl";
        }

        getDepartment(){
            throw "getDepartment is not impl";
        }

        DepartmenttoFile(Department){
            throw "DepartmenttoFile is not impl";
        }
    }

    window.__space.baseConverterImpl = baseConverterImpl;
}());
/**
 * Created by pacman29 on 29.03.17.
 */
(function () {
    class AddStudent extends window.__space.baseCommand{
        constructor(groups,id_grp,student){
            super("AddStudent_Dept");
            this._groups = groups;
            this._id_grp = id_grp;
            this._student = student;
        }

        execute(){
            
        }
    }


    class Department extends window.__space.baseObject{
        constructor(opt){
            let tmp = new Array();
            opt.forEach(iter => {
                tmp.push(new window.__space.Group(iter));
            });
            super(opt,"Department");
        }
    }
}());


/*
grps
[
    gr
    [
        st
        {
        }
        {
        }
    ]
]

 */
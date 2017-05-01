/**
 * Created by pacman29 on 12.04.17.
 */
(function () {
    class StudentView extends window.__space.baseView{
        get student() {
            return this._student;
        }

        set student(value) {
            this._student = value;
        }
        constructor(student){
            super();
            this.fields = {};
            this._root = document.createElement("div");
            this._root.setAttribute("class","student");
            this._student = student;
        }

        _createHead(){
            this._head = {};
            this._head._node = document.createElement("div");
            this._head._node.outerHTML = `<div class="head">
                                            <div class="col-lg-5 head__surname"></div>
                                            <div class="col-lg-5 head__name"></div>
                                            <div class="col-lg-2">
                                                <button class="head__button_open_student">open</button>
                                            </div>
                                         </div>`;
            this._head._surname = this._head._node.getElementsByClassName("head__surname").textContent;
            this._head._name = this._head._node.getElementsByClassName("head__name").textContent;
            this._head._button = this._head._node.getElementsByClassName("head__button_open_student");
            this._root.appendChild(this._head._node);
        }

        _createImmutable(){
            this._node = document.createElement("div");
            this._node.innerHTML = `<div class="immutable container">
                                                <div class="immutable__surname row">
                                                    <div class="immutable__title col-lg-6">Фамилия:</div>
                                                    <div class="immutable__val col-lg-6"></div>
                                                </div>
                                                <div class="immutable__name row">
                                                    <div class="immutable__title col-lg-6">Имя:</div>
                                                    <div class="immutable__val col-lg-6"></div>
                                                </div>
                                                <div class="immutable__secondname row">
                                                    <div class="immutable__title col-lg-6">Отчество:</div>
                                                    <div class="immutable__val col-lg-6"></div></div>
                                                <div class="immutable__rating row">
                                                    <div class="immutable__title col-lg-6">Рейтинг:</div>
                                                    <div class="immutable__val col-lg-6"></div></div>
                                                <div class="immutable__group row">
                                                    <div class="immutable__title col-lg-6">Группа:</div>
                                                    <select class="immutable__select col-lg-6"></select>
                                                </div>
                                                <div class="immutable__role row">
                                                    <div class="immutable__title col-lg-6">Роль:</div>
                                                    <select class="immutable__select col-lg-6"></select>
                                                </div>
                                                <div class="immutable__controls row">
                                                    <button class="immutable__change_btn col-lg-4">Изменить</button>
                                                    <button class="immutable__save_btn col-lg-4">Сохранить</button>
                                                    <button class="immutable__cancel_btn col-lg-4">Отменить</button>
                                                    <button class="immutable__hide_btn col-lg-4">Скрыть</button>
                                                </div>
                                             </div>`;
            this._surname = this._node
                .getElementsByClassName("immutable__surname")
                .getElementsByClassName("immutable__val");
            this._name = this._node
                .getElementsByClassName("immutable__name")
                .getElementsByClassName("immutable__val");
            this._secondname = this._node
                .getElementsByClassName("immutable__secondname")
                .getElementsByClassName("immutable__val");
            this._rating = this._node
                .getElementsByClassName("immutable__rating")
                .getElementsByClassName("immutable__val");
            this._group_select = this._node
                .getElementsByClassName("immutable__group")
                .getElementsByClassName("immutable__select");
            this._group_select.disable = true;
            this._role_select = this._node
                .getElementsByClassName("immutable__role")
                .getElementsByClassName("immutable__select");
            this._role_select.disable = true;
            this._change_btn = this._node
                .getElementsByClassName("immutable__change_btn");
            this._change_btn.hidden = false;
            this._save_btn = this._node
                .getElementsByClassName("immutable__save_btn");
            this._save_btn.hidden = true;
            this._cancel_btn = this._node
                .getElementsByClassName("immutable__cancel_btn");
            this._cancel_btn.hidden = true;
            this._hide_btn = this._node
                .getElementsByClassName("immutable__hide_btn");
            this._hide_btn.hidden = true;
        }

        _createGroupSelect(){
            let groups = this._student.get("Group").getDepartment().getGroupsName();
                this._group_select.innerHTML += groups.map((curr,index,arr) => {
                    if(this._student.get("Group").name() === curr){
                        return `<option selected>${curr}</option>`
                    }
                    return `<option>${curr}</option>`;
                }).reduce((a,b) => {
                    return a+b;
                });
        }

        _deleteGroupSelect(){
            this._group_select.innerHTML = "";
        }

        _createRoleSelect(){
            if(this._student.isHead()){
                this._role_select.innerHTML = `<option selected>Староста</option>
                        <option>Студент</option>`;
            } else {
                this._role_select.innerHTML = `<option>Староста</option>
                        <option selected>Студент</option>`;
            }
        }

        _deleteRoleSelect(){
            this._role_select.innerHTML = "";
        }

        ChangeStudent(bool){
            if(bool){
                this._student_save = {};
                this._student_save._surname = this._surname.textContent;
                this._student_save._name = this._name.textContent;
                this._student_save._secondname = this._secondname.textContent;
                this._student_save._rating = this._rating.textContent;
                this._student_save._group_select= this._group_select.name;
                this._student_save._role_select = this._role_select.name;
            }
            this._surname.contenteditable = bool;
            this._name.contenteditable = bool;
            this._secondname.contenteditable = bool;
            this._rating.contenteditable = bool;
            this._group_select.disable = !bool;
            this._role_select.disable = !bool;
            this._change_btn.hidden = bool;
            this._save_btn.hidden = !bool;
            this._cancel_btn.hidden =!bool;
            if(bool){
                this._createGroupSelect();
                this._createRoleSelect();
            } else {
                this._deleteGroupSelect();
                this._deleteRoleSelect();
            }
        }


    }

}());
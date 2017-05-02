/**
 * Created by pacman29 on 12.04.17.
 */
(function () {
    class StudentView extends window.__space.baseView{
        get root() {
            return this._root;
        }
        get student() {
            return this._student;
        }

        set student(value) {
            this._student = value;
            this._readInfo();
        }
        constructor(student = undefined){
            super();
            this.fields = {};
            this._root = document.createElement("div");
            this._root.setAttribute("class","student");
            this._student = student;

            this._createHead();
            this._createImmutable();
            this._node.hidden = true;
            this._head.hidden = false;
            this._root.hidden = false;
            let obj = this;

            this._head._button.addEventListener("click",((obj) => {obj._openStudent(obj)}).bind(null,obj));
            this._change_btn.addEventListener("click",((obj,bool) => {obj._changeStudentView(obj,bool)}).bind(null,obj,true));
            this._save_btn.addEventListener("click",((obj) => {obj._changeStudent(obj)}).bind(null,obj));
            this._cancel_btn.addEventListener("click",((obj,bool) => {obj._changeStudentView(obj,bool)}).bind(null,obj,false));
            this._hide_btn.addEventListener("click",((obj) => {obj._closeStudent(obj)}).bind(null,obj));

            this._readInfo();
        }

        _createHead(){
            this._head = {};
            this._head._node = document.createElement("div");
            this._head._node.innerHTML = `<div class="head container row">
                                            <div class="col-lg-5 head__surname"></div>
                                            <div class="col-lg-5 head__name"></div>
                                            <div class="col-lg-2">
                                                <button class="head__button_open_student">Открыть</button>
                                            </div>
                                         </div>`;
            this._head._surname = this._head._node.getElementsByClassName("head__surname")[0];
            this._head._name = this._head._node.getElementsByClassName("head__name")[0];
            this._head._button = this._head._node.getElementsByClassName("head__button_open_student")[0];
            this._root.appendChild(this._head._node);
        }

        _createImmutable(){
            this._node = document.createElement("div");
            this._node.innerHTML = `<div class="immutable container">                                     
                                        <div class="immutable__controls row">
                                            <button class="immutable__change_btn col-lg-4">Изменить</button>
                                            <button class="immutable__save_btn col-lg-4">Сохранить</button>
                                            <button class="immutable__cancel_btn col-lg-4">Отменить</button>
                                            <button class="immutable__hide_btn col-lg-4">Скрыть</button>
                                        </div>
                                     </div>`;

            this._surname = {};
            this._name = {};
            this._secondname = {};
            this._rating = {};
            this._group_select = {};
            this._role_checkbox = {};

            let immutable = this._node.getElementsByClassName("immutable")[0];
            let immutable__controls = this._node.getElementsByClassName("immutable__controls")[0];
            debugger;
            immutable.insertBefore(this._createInput(this,"immutable","_surname","Фамилия"),immutable__controls);
            immutable.insertBefore(this._createInput(this,"immutable","_name","Имя"),immutable__controls);
            immutable.insertBefore(this._createInput(this,"immutable","_secondname","Отчество"),immutable__controls);
            immutable.insertBefore(this._createInput(this,"immutable","_rating","Рейтинг"),immutable__controls);
            immutable.insertBefore(this._createSelect(this,"immutable","_group_select","Группа"),immutable__controls);
            immutable.insertBefore(this._createCheckbox(this,"immutable","_role_checkbox","Староста"),immutable__controls);

            this._group_select.disable = true;
            this._role_checkbox.disable = true;

            this._change_btn = this._node
                .getElementsByClassName("immutable__change_btn")[0];
            this._change_btn.hidden = false;
            this._save_btn = this._node
                .getElementsByClassName("immutable__save_btn")[0];
            this._save_btn.hidden = true;
            this._cancel_btn = this._node
                .getElementsByClassName("immutable__cancel_btn")[0];
            this._cancel_btn.hidden = true;
            this._hide_btn = this._node
                .getElementsByClassName("immutable__hide_btn")[0];
            this._hide_btn.hidden = true;

            this._surname.readonly= true;
            this._name.readonly = true;
            this._secondname.readonly = true;
            this._rating.readonly = true;
            this._group_select.disabled = true;
            this._role_checkbox.disabled = true;

            this._root.appendChild(this._node);
        }

        _createGroupSelect(){
            this._group_select.innerHTML = "";
            let groups = this._student.get("Group").getDepartment().getGroupsName();
                this._group_select.innerHTML += groups.map((curr,index,arr) => {
                    if(this._student.get("Group").name === curr){
                        return `<option selected>${curr}</option>`
                    }
                    return `<option>${curr}</option>`;
                }).reduce((a,b) => {
                    return a+b;
                });
        }

        _createRoleCheckbox(){
            this._role_checkbox.checked = !!this._student.isHead();
        }

        _openStudent(obj){
            debugger;
            obj._surname.disabled = true;
            obj._name.disabled  = true;
            obj._secondname.disabled = true;
            obj._rating.disabled = true;
            obj._group_select.disabled = true;
            obj._role_checkbox.disabled = true;

            obj._readInfo();

            obj._node.hidden = false;
            obj._head._node.hidden = true;

            obj._save_btn.hidden = true;
            obj._cancel_btn.hidden = true;
        }

        _closeStudent(obj){
            obj._surname.disabled = false;
            obj._name.disabled  = false;
            obj._secondname.disabled = false;
            obj._rating.disabled = false;
            obj._group_select.disabled = false;
            obj._role_checkbox.disabled = false;

            obj._node.hidden = true;
            obj._head._node.hidden = false;

            obj._changeStudentView(obj,false);
        }

        _readInfo(){
            this._createRoleCheckbox();
            this._createGroupSelect();

            this._head._surname.innerHTML = this._student.get("Surname");
            this._surname.value = this._student.get("Surname");
            this._head._name.innerHTML = this._student.get("Name");
            this._name.value = this._student.get("Name");
            this._secondname.value = this._student.get("Secondname");
            this._rating.value = this._student.get("Rating");
        }

        _changeStudentView(obj,bool){
            obj._surname.disabled = !bool;
            obj._name.disabled = !bool;
            obj._secondname.disabled = !bool;
            obj._rating.disabled = !bool;
            obj._group_select.disabled = !bool;
            obj._role_checkbox.disabled = !bool;

            obj._change_btn.hidden = bool;
            obj._save_btn.hidden = !bool;
            obj._cancel_btn.hidden = !bool;
            obj._hide_btn.hidden = !bool;
        }

        _changeStudent(obj){
            let tmp = obj._group_select.options;
            let Groupname = tmp[tmp.selectedIndex].innerHTML;

            debugger;
            obj._student.changeFields(
                obj._surname.value,
                obj._name.value,
                obj._secondname.value,
                obj._rating.value,
                obj._role_checkbox.checked,
                obj._student.get("Group").getDepartment().getGroup(Groupname)
            );

            this._readInfo();
        }
    }

    window.__space.StudentView = StudentView;
}());
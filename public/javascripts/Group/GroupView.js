/**
 * Created by pacman29 on 04.05.17.
 */
(function () {
    // TODO: при прорисовке всем элементам поставить display= block
  class GroupView extends window.__space.baseView{
      constructor(group = undefined){
          super();
          this._student = group;

          this._root = document.createElement("tr");
          this._root.setAttribute("class","Group");

          this._students = {};
          this._body = {};
          this._head = {};
          this._createHeader();
          this._createBody();
          this._createStudentsTable();
          this._root.appendChild(this._head._node);
          this._root.appendChild(this._body._node);
          this._root.appendChild(this._students._node);
          //this._students._node.hidden = true;
          this._body._node.hidden = true;

          this._readInfo(this);

          let obj = this;
          this._head._open_btn.addEventListener("click",((obj) => {obj._openInfo(obj)}).bind(null,obj));
          this._body._change_btn.addEventListener("click",((obj,bool) => {obj._changeInfo(obj,bool)}).bind(null,obj,true));
          this._body._save_btn.addEventListener("click",((obj) => {obj._changeGroup(obj)}).bind(null,obj));
          this._body._cancel_btn.addEventListener("click",((obj,bool) => {obj._changeInfo(obj,bool)}).bind(null,obj,false));
          this._body._hide_btn.addEventListener("click",((obj) => {obj._closeInfo(obj)}).bind(null,obj));
          this._body._delete_btn.addEventListener("click",((obj) => {obj._deleteGroup(obj)}).bind(null,obj));
          this._body._addstudent_btn.addEventListener("click",((obj) => {obj._addStudent(obj)}).bind(null,obj));
      }

      _createHeader(){
          this._head = {};
          let table = document.createElement("table");
          table.setAttribute("class","Group borderless");
          table.innerHTML = `<tbody class="Group__head">
                                <tr>
                                    <td>
                                        <a class="Group__head_name Group__head_open_btn"></a>
                                    </td>
                                </tr>
                             </tbody>
                             `;

          this._head._name = table.getElementsByClassName("Group__head_name")[0];
          this._head._open_btn = table.getElementsByClassName("Group__head_open_btn")[0];
          this._head._node = table;

      }

      _addStudent(obj){
          let newstudent = new window.__space.Student({
              Surname: "undefined",
              Name: "undefined",
              SecondName: "undefined",
              Rating: 0,
              Group: undefined
          });
          newstudent.view = window.__space.StudentView;
          obj._student.addStudent(newstudent);
          obj._readInfo(obj);
          if(document._plugins.length > 0){
              document._plugins.forEach(iter => {
                  iter.plugin(newstudent);
              })
          }
      }

      _createStudentsTable(){
          this._students = {};
          let table = document.createElement("table");
          table.setAttribute("class","Group borderless");
          table.innerHTML = `<tbody class="Group__students">
                                
                             </tbody>`;
          this._students._node = table;
      }

      _setStudentsView(obj){
          let Group__students = obj._students._node.getElementsByClassName("Group__students")[0];
          Group__students.childNodes.forEach(iter => {
              iter.parentNode.removeChild(iter);
          });

          this._student.getStudents().forEach(iter => {
              let node = iter.view.root;
              node.style.display = "block";
              Group__students.appendChild(node);
          })
      }

      _createBody(){
          this._body = {};
          let table = document.createElement("table");
          table.setAttribute("class","Group table borderless");
          table.innerHTML = `<tbody class="Group__body container">
                                <tr class="Group__body_info"></tr>
                                <div class="Group__body_controls row"></div>
                             </tbody>`;

          table.getElementsByClassName("Group__body_controls")[0].innerHTML = `<button class="Group__body_change_btn">Изменить</button>
                                   <button class="Group__body_save_btn">Сохранить</button>
                                   <button class="Group__body_cancel_btn">Отменить</button>
                                   <button class="Group__body_delete_btn">Удалить</button>
                                   <button class="Group__body_addstudent_btn">Добавить студента</button>
                                   <button class="Group__body_hide_btn">Скрыть</button>`;

          this._body._maxrating = {};
          this._body._minrating = {};
          this._body._name = {};
          this._body._averagerating = {};
          this._body._count = {};


          this._body._node = table;
          let immutable = this._body._node.getElementsByClassName("Group__body_info")[0];
          immutable.appendChild(this._createInput(this._body,"Group__body","_name","Название группы"));
          immutable.appendChild(this._createLable(this._body,"Group__body","_maxrating","Максимальный рейтинг"));
          immutable.appendChild(this._createLable(this._body,"Group__body","_minrating","Минимальный рейтинг"));
          immutable.appendChild(this._createLable(this._body,"Group__body","_averagerating","Средний рейтинг"));
          immutable.appendChild(this._createLable(this._body,"Group__body","_count","Число студентов"));


          this._body._change_btn = this._body._node.getElementsByClassName("Group__body_change_btn")[0];
          this._body._save_btn = this._body._node.getElementsByClassName("Group__body_save_btn")[0];
          this._body._cancel_btn = this._body._node.getElementsByClassName("Group__body_cancel_btn")[0];
          this._body._delete_btn = this._body._node.getElementsByClassName("Group__body_delete_btn")[0];
          this._body._addstudent_btn = this._body._node.getElementsByClassName("Group__body_addstudent_btn")[0];
          this._body._hide_btn = this._body._node.getElementsByClassName("Group__body_hide_btn")[0];

      }


      _changeGroup(obj){

          obj._student.changeName(obj._body._name.value);
          obj._changeInfo(obj,false);debugger;
          obj._readInfo(obj);
      }

      _readInfo(obj = this){
          obj._head._name.innerHTML = obj._student.name;
          obj._body._name.value = obj._student.name;
          obj._body._maxrating.innerHTML = obj._student.getMaxRating();
          obj._body._minrating.innerHTML = obj._student.getMinRating();
          obj._body._averagerating.innerHTML = obj._student.getAvarageRating();
          obj._body._count.innerHTML = obj._student.getCount();
          obj._setStudentsView(obj);

      }

      _openInfo(obj){
          obj._readInfo(obj);
          obj._head._node.hidden = true;
          obj._body._node.hidden = false;
          obj._changeInfo(obj,false);
      }

      _closeInfo(obj){
          obj._readInfo(obj);
          obj._body._node.hidden = true;
          obj._head._node.hidden = false;
          obj._changeInfo(obj,false);
      }

      _changeInfo(obj,bool){
          obj._body._name.disabled = !bool;
          if(bool){
              obj._body._change_btn.style.display = "none";
              obj._body._save_btn.style.display = "block";
              obj._body._cancel_btn.style.display = "block";
              obj._body._delete_btn.style.display = "block";
              obj._body._addstudent_btn.style.display = "block";

          } else {
              obj._body._change_btn.style.display = "block";
              obj._body._save_btn.style.display = "none";
              obj._body._cancel_btn.style.display = "none";
              obj._body._delete_btn.style.display = "none";
              obj._body._addstudent_btn.style.display = "none";
          }
      }

      _deleteGroup(obj){
          obj._student.delete();
          obj._root.style.display = "none"
      }
  }

  window.__space.GroupView = GroupView;
}());
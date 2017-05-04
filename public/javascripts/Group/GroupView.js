/**
 * Created by pacman29 on 04.05.17.
 */
(function () {
    // TODO: при прорисовке всем элементам поставить display= block
  class GroupView extends window.__space.baseView{
      constructor(group = undefined){
          super();
          this._group = group;

          this._root = document.createElement("div");
          this._root.setAttribute("class","Group");

          this._createHeader();
          this._createBody();
          this._createStudentsTable();
          this._root.appendChild(this._head._node);
          this._root.appendChild(this._body._node);
          this._body._node.style.display = "none";
          this._root.appendChild(this._students._node);
          this._students._node.style.display = "none";

          this._readInfo(this);

          let obj = this;
          this._head._open_btn.addEventListener("click",((obj) => {obj._openInfo(obj)}).bind(null,obj));
          this._body._change_btn.addEventListener("click",((obj,bool) => {obj._changeInfo(obj,bool)}).bind(null,obj,true));
          this._body._save_btn.addEventListener("click",((obj) => {obj._changeGroup(obj)}).bind(null,obj));
          this._body._cancel_btn.addEventListener("click",((obj,bool) => {obj._changeInfo(obj,bool)}).bind(null,obj,false));
          //this._body._hide_btn.addEventListener("click",((obj) => {obj._closeGroup(obj)}).bind(null,obj));
          this._body._delete_btn.addEventListener("click",((obj) => {obj._deleteGroup(obj)}).bind(null,obj));
      }

      _createHeader(){
          this._head = {};
          let table = document.createElement("table");
          table.setAttribute("class","Group");
          table.innerHTML = `<tbody class="Group__head">
                                <th>
                                    <td class="Group__head_name"></td>
                                    <td>
                                        <div>
                                            <button class="Group__head_open_btn">Открыть</button>
                                        </div>
                                    </td>
                                </th>
                             </tbody>
                             `;

          this._head._name = table.getElementsByClassName("Group__head_name")[0];
          this._head._open_btn = table.getElementsByClassName("Group__head_open_btn")[0];
          this._head._node = table;

      }

      _createStudentsTable(){
          this._students = {};
          let table = document.createElement("table");
          table.setAttribute("class","Group");
          table.innerHTML = `<tbody class="Group__students">
                                
                             </tbody>`;
          this._students._node = table;
      }

      _createBody(){
          this._body = {};
          let table = document.createElement("table");
          table.setAttribute("class","Group");
          table.innerHTML = `<tbody class="Group__body">
                                <th class="Group__body_info"></th>
                                <tr class="Group__body_controls">
                                         <div class="row">
                                            <button class="Group__body_change_btn">Изменить</button>
                                            <button class="Group__body_save_btn">Сохранить</button>
                                            <button class="Group__body_cancel_btn">Отменить</button>
                                            <button class="Group__body_delete_btn">Удалить</button>
                                            <button class="Group__body_addstudent_btn">Добавить студента</button>
                                            <button class="Group__body_hide_btn">Скрыть</button>
                                           </div>
                                        </tr>
                             </tbody>`;

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

          debugger;

          this._body._change_btn = this._body._node.getElementsByClassName("Group__body_change_btn")[0];
          this._body._save_btn = this._body._node.getElementsByClassName("Group__body_save_btn")[0];
          this._body._save_btn.hidden = true;
          this._body._cancel_btn = this._body._node.getElementsByClassName("Group__body_cancel_btn")[0];
          this._body._cancel_btn.hidden = true;
          this._body._delete_btn = this._body._node.getElementsByClassName("Group__body_delete_btn")[0];
          this._body._delete_btn.hidden = true;
          this._body._addstudent_btn = this._body._node.getElementsByClassName("Group__body_addstudent_btn")[0];
          this._body._addstudent_btn.hidden = true;
          this._body._hide_btn = this._body._node.getElementsByClassName("Group__body_hide_btn")[0];

      }

      _changeGroup(obj){

      }

      _readInfo(obj){
          obj._head._name.innerHTML = obj._group.name;
          obj._body._name.value = obj._group.name;
          obj._body._maxrating.innerHTML = obj._group.getMaxRating();
          obj._body._minrating.innerHTML = obj._group.getMinRating();
          obj._body._averagerating.innerHTML = obj._group.getAvarageRating();
          obj._body._count.innerHTML = obj._group.getCount();

      }

      _openInfo(obj){
          obj._readInfo(obj);
          obj._head._node.style.display = "none";
          obj._body._node.style.display = "block";
          obj._changeInfo(obj,false);
      }

      _closeInfo(obj){
          obj._readInfo(obj);
          obj._body._node.style.display = "none";
          obj._head._node.style.display = "block";
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
  }

  window.__space.GroupView = GroupView;
}());
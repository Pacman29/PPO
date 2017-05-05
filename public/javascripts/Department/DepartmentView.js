/**
 * Created by pacman29 on 05.05.17.
 */
(function () {
  class DepartmentView extends window.__space.baseView {
      get filereader() {
          return this._filereader;
      }

      set filereader(value) {
          this._filereader = value;
      }
      constructor(department = undefined){
          super();
          this._department = department;
          this._head = {};
          this._body = {};
          this._root = document.createElement("table");
          this._root.setAttribute("class","Department table-bordered");

          this._filereader = undefined;

          this._createHead();
          this._createBody();

          this._root.appendChild(this._head._node);
          this._root.appendChild(this._body._node);

          let obj = this;

          this._head._load_file_btn.addEventListener("change",this._loadFile.bind(obj));
          this._head._addgroup_btn.addEventListener("click",((obj) => {obj._addGroup(obj)}).bind(null,obj));
          this._head._undo_btn.addEventListener("click",((obj) => {obj._undo(obj)}).bind(null,obj));
          this._head._redo_btn.addEventListener("click",((obj) => {obj._redo(obj)}).bind(null,obj));
      }

      _createHead(){
          let table = document.createElement("tbody");
          table.setAttribute("class","Department__head");
          table.innerHTML = `<tr class="Department__controls">
                                        <td><input type="file" class="Department__load_file_btn"></button>
                                        <button class="Department__addgroup_btn">Добавить группу</button>
                                        <button class="Department__undo_btn">Назад</button>
                                        <button class="Department__redo_btn">Вперед</button></td>
                              </tr>`;
          this._head._node = table;
          this._head._load_file_btn = this._head._node.getElementsByClassName("Department__load_file_btn")[0];
          this._head._addgroup_btn = this._head._node.getElementsByClassName("Department__addgroup_btn")[0];
          this._head._undo_btn = this._head._node.getElementsByClassName("Department__undo_btn")[0];
          this._head._redo_btn = this._head._node.getElementsByClassName("Department__redo_btn")[0];
      }

      _createBody(){
          let table = document.createElement("tbody");
          table.class = "Department__body";
          this._body._node = table;
      }

      _clearGroups(obj){
          obj._body._node.childNodes.forEach(iter => {
              iter.parentNode.removeChild(iter);
          });
      }

      _readInfo(obj = this){
          obj._clearGroups(obj);
          obj._department.groups.forEach(iter => {
              let node = iter.view.root;
              node.style.display = "block";
              obj._body._node.appendChild(node);
          })
      }

      _loadFile(obj){
          if(this._filereader === undefined){
              return;
          }
          this._filereader(this,obj);
      }

      _addGroup(obj){
          let newgroup = new window.__space.Group();
          newgroup.view = window.__space.GroupView;
          this._department.addGroup(newgroup);
          this._readInfo(obj);
      }

      _undo(obj){
          debugger;
          this._department.undo();
          this._readInfo(obj);
      }

      _redo(obj){
          this._department.redo();
          this._readInfo(obj);
      }
  }

  window.__space.DepartmentView = DepartmentView;
}());
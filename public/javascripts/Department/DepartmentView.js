/**
 * Created by pacman29 on 05.05.17.
 */
(function () {
  class DepartmentView extends window.__space.baseView {
      constructor(){
          super();
          this._head = {};
          this._body = {};
      }

      _createHead(){
          let table = document.createElement("table");
          table.class = "Department";
          table.innerHTML = `<tbody>
                                <th>
                                    <div class="Department__controls">
                                        <button class="Department__load_file_btn">Загрузить данные</button>
                                        <button class="Department__addgroup_btn">Добавить группу</button>
                                        <button class="Department__undo_btn">Назад</button>
                                        <button class="Department__redo_btn">Вперед</button>
                                    </div>
                                </th>
                             </tbody>`;
          this._head._node = table;
          this.
      }

      _createBody(){

      }
  }

  window.__space.DepartmentView = DepartmentView;
}());
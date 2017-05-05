/**
 * Created by pacman29 on 21.04.17.
 */
(function () {
    class baseView{

        constructor(){
            this._root = undefined;
        }

        get root() {
            this._readInfo(this);
            return this._root;
        }

        _createInput(save_node, class_group, classname, name){
            let tr = document.createElement("tr");
            tr.setAttribute("class",`${class_group}_${classname}`);
            tr.innerHTML =`<td class="${class_group}__title">${name}:</td>
                            <td><input type="text" class="${class_group}__val"></td>`;
            save_node[classname] = tr.getElementsByClassName(`${class_group}__val`)[0];
            return tr;
        }

        _createLable(save_node, class_group,classname, name){
            let tr = document.createElement("tr");
            tr.setAttribute("class",`${class_group}_${classname}`);
            tr.innerHTML =`<td class="${class_group}__title">${name}:</td>
                            <td class="${class_group}__val"></td>`;
            save_node[classname] = tr.getElementsByClassName(`${class_group}__val`)[0];
            return tr;
        }

        _createSelect(save_node,class_group,classname,name){
            let tr = document.createElement("tr");
            tr.setAttribute("class",`${class_group}_${classname}`);
            tr.innerHTML =`<td class="${class_group}__title">${name}:</td>
                           <td><select class="${class_group}__select"></select></td>`;
            save_node[classname] = tr.getElementsByClassName(`${class_group}__select`)[0];
            return tr;
        }

        _createCheckbox(save_node,class_group,classname,name){
            let tr = document.createElement("tr");
            tr.setAttribute("class",`${class_group}_${classname}`);
            tr.innerHTML =`<td class="${class_group}__title">${name}:</td>
                           <td><input type="checkbox" class="${class_group}__checkbox"></td>`;
            save_node[classname] = tr.getElementsByClassName(`${class_group}__checkbox`)[0];
            return tr;
        }

        _readInfo(obj){

        }

    }

    window.__space.baseView = baseView;
}());
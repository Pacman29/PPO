/**
 * Created by pacman29 on 21.04.17.
 */
(function () {
    class baseView{

        constructor(){
            this._root = undefined;
        }

        get root() {
            return this._root;
        }

        _createInput(save_node, class_group, classname, name){
            let div = document.createElement("div");
            div.setAttribute("class",`${class_group}_${classname} row`);
            div.innerHTML =`<div class="${class_group}__title col-lg-6">${name}:</div>
                            <input type="text" class=${class_group}__val col-lg-6">`;
            save_node[classname] = div.getElementsByClassName(`${class_group}__val`)[0];
            return div;
        }

        _createSelect(save_node,class_group,classname,name){
            let div = document.createElement("div");
            div.setAttribute("class",`${class_group}_${classname} row`);
            div.innerHTML =`<div class="${class_group}__title col-lg-6">${name}:</div>
                            <select class="${class_group}__select col-lg-6"></select>`;
            save_node[classname] = div.getElementsByClassName(`${class_group}__select`)[0];
            return div;
        }

        _createCheckbox(save_node,class_group,classname,name){
            let div = document.createElement("div");
            div.setAttribute("class",`${class_group}_${classname} row`);
            div.innerHTML =`<div class="${class_group}__title col-lg-6">${name}:</div>
                            <input type="checkbox" class="${class_group}__checkbox col-lg-6">`;
            save_node[classname] = div.getElementsByClassName(`${class_group}__checkbox`)[0];
            return div;
        }

    }

    window.__space.baseView = baseView;
}());
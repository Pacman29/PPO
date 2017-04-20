/**
 * Created by pacman29 on 12.04.17.
 */
(function () {
    class StudentView{
        constructor(opt){
            this._student = opt.fields;
            this._student.onchange = redraw();
            this._node = document.createElement("div");
            this._fields = {};

            this._head = document.createElement("div");
            this._head.textContent = `${this._student.Surname} ${this._student.Name}`;

            this._body = document.createElement("div");

            let table = document.createElement("table");
            for(let key in this._student){
                let tmp = this._createField(key.toString(),this._student[key].toString());
                table.appendChild(tmp);
                this._fields[key.toString()] = tmp.value;
            }

            this._body.appendChild(table);

            let button = document.createElement("button");
            button.textContent = "Изменить";
            button.addEventListener("click",event => {

                
            });

            this._body.hidden = false;
            this._head.addEventListener("click", event => {
                this._body.hidden = !this._body.hidden;
            });

            this._node.appendChild(this._head);
            this._node.appendChild(this._body);
        }

        redraw(){

        }

        _createField(name,value){
            let result = {};
            result.node = document.createElement("tr");
            result.name = document.createElement("td");
            result.name.textContent = name;
            result.value = document.createElement("td");
            result.value.contenteditable = false;
            result.value.textContent = value;
            result.node.appendChild(result.name);
            result.node.appendChild(result.value);
            return result;

        }

        _Editable(flag){
            this._fields.forEach(iter => {
                iter.value.contenteditable = true;
            })
        }
    }
}());
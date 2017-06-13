/**
 * Created by pacman29 on 19.03.17.
 */
(function () {
    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }


    let tmp = getCookie("back_color");
    if(tmp){
        document.body.style.background = tmp;
    }

    function applytoallobjects(department,object_func,plugin_func) {
        if(object_func === "clear"){
            department.clear_plugin(plugin_func);
            department.groups.forEach(group => {
                group.clear_plugin(plugin_func);
                group.students.forEach(student => {
                    student.clear_plugin(plugin_func);
                })
            })
        } else {
            department.execute_plugin(plugin_func);
            department.groups.forEach(group => {
                group.execute_plugin(plugin_func);
                group.students.forEach(student => {
                    student.execute_plugin(plugin_func);
                })
            })
        }
    }

    document._plugins = [];

    var dept = new window.__space.Department();
    dept.view = window.__space.DepartmentView;
    dept.view.filereader = window.__space.fileloader;
    document.getElementsByTagName("body")[0].appendChild(dept.view.root);
    dept.view._readInfo();
    document.__space = {};
    document.__space.department = dept;

    document.getElementsByClassName("plugin__select")[0].addEventListener("change",function () {
        document._plugins.forEach(iter => {
            applytoallobjects(document.__space.department,"clear",iter.clear);
        });
        document._plugins = [];
        let value = document.getElementsByClassName("plugin__select")[0].value;
        if(value === "не загружен"){
            return;
        }
        debugger;
        switch (value){
            case "не загружен":
                break;
            case "plugin-download":{
                document._plugins.push(document.plugin_load);
                break;
            }
            case "plugin-background":{
                document._plugins.push(document.plugin_back);
                break;
            }
        }

        document._plugins.forEach(iter => {
            applytoallobjects(document.__space.department,"execute",iter.plugin);
        });
    })
}());
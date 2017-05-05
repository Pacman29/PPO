/**
 * Created by pacman29 on 19.03.17.
 */
(function () {
    var dept = new window.__space.Department();
    dept.view = window.__space.DepartmentView;
    dept.view.filereader = window.__space.fileloader;
    document.getElementsByTagName("body")[0].appendChild(dept.view.root);
    dept.view._readInfo();
}());
/**
 * Created by pacman29 on 13.06.17.
 */
(function () {
    let id = 0;
  function plugin(object) {
      this._student = object;
      let downloader_fab = new window.__space.FileDownLoader();
      this.downloader = downloader_fab.get("json");
      let obj_view = object.view;
      let elem = document.createElement("button");
      elem.setAttribute("class",`plugin-load__button button_${id++}`);

      elem.textContent ="Сохранить";
      debugger;
      obj_view._head._node.appendChild(elem);

      elem.addEventListener("click", function (object) {
          debugger;
          this.downloader.downloadFile(JSON.stringify(object.getJson()),"test.txt");
      }.bind(this,object));

  }

  function clear(department) {
      let elems  = [].slice.call(department.view.root.getElementsByClassName("plugin-load__button"));

      elems.forEach(iter => {
          iter.parentNode.removeChild(iter);
      })
  }
  document.plugin_load = {plugin: plugin, clear: clear};
}());
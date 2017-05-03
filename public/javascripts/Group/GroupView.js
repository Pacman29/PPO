/**
 * Created by pacman29 on 04.05.17.
 */
(function () {
    // TODO: при прорисовке всем элементам поставить display= block
  class GroupView extends window.__space.baseView{
      constructor(group = undefined){
          super()
          this._group = group;
      }
  }
}())
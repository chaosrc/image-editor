import Util from '../util/Util.js';

export default class Drag{
  constructor(canvas){
    this.canvas=canvas;
    this.canvasEle;
  }
  
  //call this function after choose this tool
  selected(property,stack){
    this.setCursor('grab');
    this.setSelectable(true);
    this.addMouseEvent();
  }

  remove(){
    //TODO:remove Event Styles
    this.setCursor('default');
    this.setSelectable(false);
    this.removeMouseEvent();

  }
  addMouseEvent(){
    this.canvas.on('mouse:wheel',this.handleMouseWheel);
  }
  removeMouseEvent(){
    this.canvas.off('mouse:wheel',this.handleMouseWheel)
  }
  handleMouseWheel(e){

  }
  getPropertys(){

  }
  setPropertys(){

  }
}

/**
 * style
 * .drag{
 *    cursor: move; fallback if grab cursor is unsupported 
      cursor: grab;
      cursor: -moz-grab;
      cursor: -webkit-grab;
 * }
 * .drag:active{
 *    cursor:grabbing
 *    cursor: -moz-grabbing;
      cursor: -webkit-grabbing;
 * }
 */




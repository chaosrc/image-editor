import Util from '../util/Util.js';

export default class Drag{
  constructor(canvas){
    this.canvas=canvas;
    this.scaleNumber=1;
    this.absolutePan={x:0,y:0};
    this.handleMouseWheel=this.handleMouseWheel.bind(this);
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
  setSelectable(isSelectable){
    this.canvas.forEachObject(o=>o.selectable=isSelectable);
  }
  setCursor(cursor){
    let moveCursor=cursor;
    if(cursor==='grab'){
          let wkGrab='-webkit-grab',
          mzGrab='-moz-grab';
          cursor='move';
          moveCursor='move';
     
    }
    this.canvas.hoverCursor=cursor;
    this.canvas.moveCursor=moveCursor;
  }
  addMouseEvent(){
    this.canvas.on('mouse:wheel',this.handleMouseWheel);
    this.canvas.on('object:added',this.handleObjectAdd);
  }
  removeMouseEvent(){
    this.canvas.off('mouse:wheel',this.handleMouseWheel);
    this.canvas.off('object:added',this.handleObjectAdd)
  }
  handleMouseWheel(options){
    let scale=options.e.deltaY,
        scope=0.2;
    if(scale<0){
      if(this.scaleNumber<=10) this.scaleNumber+=scope*this.scaleNumber;
    }
    else{
      if(this.scaleNumber>0.2) this.scaleNumber-=scope*this.scaleNumber;
    } 

    let {x,y}=this.getMousePosition(options.e),
        sl=this.scaleNumber,
        moveX=sl*x-x,
        moveY=sl*y-y;
    // this.canvas.absolutePan({x:moveX,y:moveY});
    this.canvas.zoomToPoint({x,y},this.scaleNumber);
  }
  handleObjectAdd(e){
    e.target.selectable=true;
  }
  //get the mouse position from native event
  getMousePosition(e){
    let coord=fabric.util.getPointer(e);
    let offset=fabric.util.getElementOffset(this.canvas.upperCanvasEl);
    // fabric.util.getScrollLeftTop(this.canvas.upperCanvasEl);
    return {x:coord.x-offset.left,y:coord.y-offset.top};
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




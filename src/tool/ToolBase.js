export default class ToolBase{
  constructor(canvas){
    this.canvas=canvas;
  }
  
  //call this function after choose this tool
  selected(property,stack){
    this.addCursor();
    this.addMouseEvent();
  }

  remove(){
    this.removeMouseEvent();
    this.removeCursor();
  }

  addCursor(){
  }

  removeCursor(){

  }

  addMouseEvent(){
    this.canvas.on('object:added',this.handleObjectAdd);
  }

  removeMouseEvent(){
     this.canvas.off('object:added',this.handleObjectAdd);
  }

  getPropertys(){

  }

  setPropertys(){

  }

  getMousePosition(e){
    let coord=fabric.util.getPointer(e);
    let offset=fabric.util.getElementOffset(this.canvas.upperCanvasEl);
    // fabric.util.getScrollLeftTop(this.canvas.upperCanvasEl);
    return {x:coord.x-offset.left,y:coord.y-offset.top};
  }
  setSelectable(isSelectable){
    this.canvas.forEachObject(o=>o.selectable=isSelectable);
  }
}
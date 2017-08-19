export default class ToolBase{
  constructor(canvas){
    this.canvas=canvas;
    this.reciveProperty;
    this.property={type:'basic'};
  }
  
  //call this function after choose this tool
  selected(reciveProperty,stack){
    this.addCursor();
    this.addMouseEvent();
    this.reciveProperty=reciveProperty;
    this.sendProperty();
  }

  remove(){
    this.removeMouseEvent();
    this.removeCursor();
  }
  sendProperty(){
    if(!(this.reciveProperty instanceof Function)) return;
    this.reciveProperty(this.property);
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
    return this.property;
  }
  setPropertys(options){
    if(!options||options.type!==this.property.type) return;
    this.property=options;
    this.update();
  }
  update(){}
  onPropertyCange(){
    
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
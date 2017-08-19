import ToolBase from './ToolBase.js';
export default class TextTool extends ToolBase{
  constructor(canvas){
    super(canvas);
    this.currentText;
    this.property.type='i-text';
    this.handleMouseDown=this.handleMouseDown.bind(this);
  }
  
  //call this function after choose this tool
  selected(property,stack){
    super.selected(property,stack);
  }

  remove(){
    super.remove();
    this.setSelectable(false);
  }
  addCursor(){
    this.canvas.hoverCursor='default';
  }

  addMouseEvent(){
    this.canvas.on('mouse:up',this.handleMouseDown);

  }
  removeMouseEvent(){
     this.canvas.off('mouse:up',this.handleMouseDown);
  }

  handleMouseDown(option){
    if(this.currentText&&!this.currentText.text){
      this.canvas.remove(this.currentText);
    }
    let point=this.canvas.getPointer(option.e);
    let activeText=this.getObjectFromPoint(point,'i-text');
    if(!activeText){
      activeText=new fabric.IText('',{top:point.y-30,left:point.x-2});
      this.canvas.add(activeText);
    }
    this.canvas.setActiveObject(activeText);
    activeText.enterEditing();
    this.currentText=activeText;
              // .selectAll();
    // activeText.hiddenTextarea.focus();
  
  }
  setCurrentText(fabricText){
    this.currentText=fabricText;
    this.property=fabricText.toObject();
    this.sendProperty();
  }
  handleObjectAdd(e){
    e.target.selectable=true;
  }
  getObjectFromPoint(p,type){
    let objects=this.canvas.getObjects(type);
    objects=objects.filter(obj=>obj.containsPoint(p));
    return objects&&objects.length?objects[objects.length-1]:undefined;
  }
  update(){
    if(!this.currentText) return;
    this.currentText.setOpions(this.property);
    this.canvas.rendAll();
  }
}

/**
 * fabric.IText
 * type:i-text
 * enterEditing()
 * exitEditing()
 * containsPoint({x,y})
 * setCursorByClick(e)
 * 
 * fabric.canvas
 * getPointer(e,ignoreZoom)
 * getObjects(typeopt)
 * getActiveObject() 
 */
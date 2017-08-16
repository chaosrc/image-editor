
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
  setSelectable(isSelectable){
    this.canvas.forEachObject(o=>o.selectable=isSelectable);
  }
  setCursor(cursor){
    let moveCursor=cursor;
    if(cursor==='grab'){
      let style=document.body.style,
          wkGrab='-webkit-grab',
          mzGrab='-moz-grab';
          cursor=wkGrab;
          moveCursor=wkGrab+'bing';
      // if( wkGrab in style){
      //     cursor=wkGrab;
      //     moveCursor=wkGrab+'bing';
      // } 
      // else if( mzGrab in style){
      //     cursor=mzGrab;
      //     moveCursor=mzGrab+'bing';
      // } 
      // else cursor=moveCursor='move';
    }
    this.canvas.hoverCursor=cursor;
    this.canvas.moveCursor=moveCursor;
  }
  addMouseEvent(){
    this.canvas.on('mouse:wheel',this.handleMouseWheel);
  }
  removeMouseEvent(){
    this.canvas.off('mouse:wheel',this.handleMouseWheel)
  }
  handleMouseWheel(e){
    console.log('wheel',e.deltaX,e.deltaY);
  }
  getPropertys(){

  }
  setPropertys(){

  }
}
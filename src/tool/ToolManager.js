import Drag from './Drag.js';
export default class ToolManager{
  constructor(canvas){
    this._currentProperty;
    this.currentTool;
    this.canvas=canvas;
    this.initCanvasState();
  }
  initCanvasState(){
    this.canvas.selection=false;
    this.canvas.hoverCursor='default';
    this.canvas.on('object:added',e=>e.target.selectable=false);
  }
  /**
   * Select a tool object by the parameter tool
   * @param tool name of the tool object
   */
  select(tool){
    if(this.currentTool) this.currentTool.remove();
    this.currentTool=this.getTool(tool);
    this.currentTool.selected();
    this.toolProperty=this.currentTool.property;
  }
  /**
   * Get tool object from tool name 
   * @param tool name of tool object
   */
  getTool(tool){
    let tl;
    switch(tool){
      // case 'zoom':
      //    tl=Zoom.getInstance();
      //    break;
      case 'drag':
         tl=new Drag(this.canvas);
         break;
      default:
        tl={};
         console.log(`${tool} is not existence`);
    }
    return tl;
  }
  get toolProperty(){
    return this._currentProperty;
  }
  set toolProperty(property){
    this._currentProperty=property;
  }
}
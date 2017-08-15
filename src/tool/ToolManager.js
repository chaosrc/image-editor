export default class ToolManager{
  constructor(canvas){
    this._currentProperty;
    this.currentTool;
    this.canvas=canvas;
    this.initCanvasSate();
  }
  initCanvasState(){
    this.canvas.selection=false;
  }
  /**
   * Select a tool object by the parameter tool
   * @param tool name of the tool object
   */
  select(tool){
    if(this.currentTool) this.currentTool.remove();
    this.currentTool=this.getTool(tool);
    this.toolProperty=this.currentTool.property;
  }
  /**
   * Get tool object from tool name 
   * @param tool name of tool object
   */
  getTool(tool){
    let tl;
    switch(tool){
      case 'zoom':
         tl=Zoom.getInstance();
         break;
      case 'drag':
         tl=Drag.getInstance();
         break;
      default:
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
import Drag from './Drag.js';
import TextTool from './Text.js'
export default class ToolManager{
  constructor(canvas){
    this._currentProperty;
    this.currentTool;
    this.toolInstance={};
    this.canvas=canvas;
    this.initCanvasState();
  }
  initCanvasState(){
    this.canvas.selection=false;
    this.canvas.hoverCursor='default';
    this.canvas.on('object:added',e=>e.target.selectable=true);
  }
  /**
   * Select a tool object by the parameter tool
   * @param tool name of the tool object
   */
  select(tool,reciveProperty){
    if(this.currentTool) this.currentTool.remove();
    this.currentTool=this.getTool(tool);
    if(!this.currentTool) return;
    this.currentTool.selected(reciveProperty);
    this.toolProperty=this.currentTool.property;
  }
  /**
   * Get tool object from tool name 
   * @param tool name of tool object
   */
  getTool(toolName){
    let tool=this.toolInstance[toolName];
    if(!tool) {
      tool=ToolFactory.get(toolName,this.canvas);
      this.toolInstance[toolName]=tool;
    }
    return tool;
  }
  get toolProperty(){
    return this._currentProperty;
  }
  set toolProperty(property){
    this._currentProperty=property;
    this.currentTool.setPropertys(property);
  }
}
/**
 * ToolFactory to create tool object
 */
class ToolFactory{
  static get(name,canvas){
    let tool=ToolFactory.tools[name];
    return tool?new tool(canvas):undefined;
  }
}
ToolFactory.tools={
    drag:Drag,
    text:TextTool
  };


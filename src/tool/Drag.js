import ToolBase from './ToolBase.js';

export default class Drag extends ToolBase {
  constructor(canvas){
    super(canvas);
    this.scaleNumber=1;
    // this.absolutePan={x:0,y:0};
    this.handleMouseWheel=this.handleMouseWheel.bind(this);
    this.handleObjectSelected=this.handleObjectSelected.bind(this);
    this.filterManager=new FilterManager(canvas);
  }
  
  //call this function after choose this tool
  selected(property,stack){
    super.selected(property,stack);
    this.setCursor('grab');
    this.setSelectable(true);
    let initObject=this.canvas.getActiveObject();
    if(initObject) this.handleObjectSelected({target:initObject});
  }
  
  remove(){
    //TODO:remove Event Styles
    this.setCursor('default');
    this.setSelectable(false);
    this.removeMouseEvent();
    this.currentObject='';

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
    this.canvas.on('object:selected',this.handleObjectSelected);
  }
  removeMouseEvent(){
    this.canvas.off('mouse:wheel',this.handleMouseWheel);
    this.canvas.off('object:added',this.handleObjectAdd);
    this.canvas.off('object:selected',this.handleObjectSelected);
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
  handleObjectSelected(options){
    this.currentObject=options.target;
    // console.log('drag selected',options.target);
    this.property=ToolBase.getObjectStyle(options.target);
    if(options.target.type==='image'){
      this.property.filters=this.filterManager.getImageFilter(options.target);
      console.log('upload filters',this.property.filters)
    }
    this.sendProperty();
  }
  //get the mouse position from native event
  getMousePosition(e){
    let coord=fabric.util.getPointer(e);
    let offset=fabric.util.getElementOffset(this.canvas.upperCanvasEl);
    // fabric.util.getScrollLeftTop(this.canvas.upperCanvasEl);
    return {x:coord.x-offset.left,y:coord.y-offset.top};
  }
  update(){
    if(!this.currentObject) return;
    if(this.currentObject.type==='image'){
      this.filterManager.applyFilter(this.property.filterNames,this.currentObject);
      // this.canvas.renderAll();
      // return;
    }
    this.currentObject.setOptions(this.property)
    this.canvas.renderAll();
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


class FilterManager{
  constructor(canvas){
    this.canvas=canvas;
    this.filterRecorder=[];
    this.currentImage;
  }
  applyFilter(filters,target){
    let img=this.currentImage=target;
    if(!img||img.type!=='image'||!filters) return;
    let lastFilters=this.getImageFilter(img);
    let filterHolder=lastFilters.slice();
    //remove not needed filters
    for(let i in lastFilters){
        let index=filters.indexOf(lastFilters[i]);
        if(index!==-1){
          filters.splice(index,1);
        }else{
          filterHolder.splice(i,1);
          let drop=img.filters.splice(i,1);
          console.log('remove',drop);
        }
    }
    // create new filters
    filters.forEach(v=>{
      let f=this.createFilter(v);
      if(f) img.filters.push(f);
    });

    
    // for(let i in filters){
    //   img.filters[i]=this.createFilter(filters[i]);
    // }
    img.applyFilters(()=>{
      this.canvas.renderAll();
    });
    this.saveFilter([...filterHolder,...filters]);
    console.log('saved filter',[...filterHolder,...filters])
  }
  //TODO:improve performance
  saveFilter(filters){
    let img=this.currentImage,
        recorder=this.filterRecorder;
    for(let item in recorder){
      if(recorder[item].image===img){
        recorder[item].filters=filters;
        return;
      }
    }
    recorder.push({image:img,filters:filters});
    console.log('push recorder',recorder);
  }
  getImageFilter(img){
    if(!(img instanceof fabric.Image)) return;
    for(let item in this.filterRecorder){
      if(this.filterRecorder[item].image===img) return this.filterRecorder[item].filters;
    }
    return [];
  }
  createFilter(name){
   try{
    let filter= new fabric.Image.filters[name]();
    return filter
   }catch(error){
    console.log(error);
   }
  }
}

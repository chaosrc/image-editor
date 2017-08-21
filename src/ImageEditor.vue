
<template>
  <div  id="image-edit">
    <upload-file @selected="imageUpload"></upload-file>
    <div>
      <property-component :passproperty="toolProperty" @change="handlePropertyChange"></property-component>
      <toolbox class="float-left" @select="handleToolSelect"></toolbox>
      <div class="canvas-container float-left">
        <canvas ref="canvas" width="300px" height="300px">
          you browser dosen't surport canvas
        </canvas>
      </div>
    </div>
  </div>

</template>

<script>
 import UploadFile from './view/UploadFile.vue'; 
 import Toolbox from './view/Toolbox.vue';
 import ToolManager from './tool/ToolManager';
 import PropertyComponent from './view/toolProperty/PropertyComponent.vue';
  export default {
    name:'image-edit',
    data(){
      return {
        canvas:'',
        toolManager:'',
        toolProperty:''
      }
    },
    mounted(){
     this.init();
    
     //just for test
     window.mycvs=this.canvas;
    },
    methods:{
      init(){
        this.canvas=new fabric.Canvas(this.$refs.canvas);
        this.toolManager=new ToolManager(this.canvas);
        this.recivedProperty=this.recivedProperty.bind(this);
      },
      imageUpload(file){
        this.drawImage(file);
      },
      drawImage(file){
        let cvs=this.canvas;
        this.getImageFromFile(file,function(img){
          let image=new fabric.Image(img);
          cvs.add(image);
        });
      },
      getImageFromFile(f,cb){
         let url=window.URL.createObjectURL(f);
         this.getImageFromURL(url,function(img){
           window.URL.revokeObjectURL(img.src);
           cb(img)
         })
      },
      getImageFromURL(url,cb){
        let img=new Image();
        img.src=url;
        img.onload=function(){
          cb(img);
        }
      },
      handleToolSelect(value){
        this.toolManager.select(value,this.recivedProperty);
        // this.toolProperty=this.toolManager.toolProperty;
      },
      recivedProperty(property){
        this.toolProperty=property;
        // console.log('recived',property);
      },
      handlePropertyChange(property){
        if(property.type==='image-filter'){
          this.toolManager.imageFilter(property.filters);
        }
        this.toolManager.toolProperty=property;
        // console.log('onchange',property);
      }
    },
    components:{
      UploadFile,
      Toolbox,
      PropertyComponent
    }
  }
</script>

<style scoped>

</style>
<style>
  .float-left{
     float:left; 
  }
  canvas{
    border:2px black solid;
  }
  .cursor-grab{
    cursor:move;
    cursor:-webkit-grab;
    cursor:-mz-grab;
  }
  .cursor-grab::active{
    cursor:move;
    cursor:-webkit-grabbing;
    cursor:-mz-grabbing;
  }
</style>


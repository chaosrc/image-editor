
<template>
  <div  id="image-edit">
    <upload-file @selected="imageUpload"></upload-file>
    <div>
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
        this.toolManager.select(value);
        // this.toolProperty=this.toolManager.toolProperty;
      }
    },
    components:{
      UploadFile,
      Toolbox
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


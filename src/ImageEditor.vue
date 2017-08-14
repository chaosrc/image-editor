
<template>
  <div  id="image-edit">
    <upload-file @selected="imageUpload"></upload-file>
    <div>
      <toolbox class="float-left" @select="handleToolSelect"></toolbox>
      <canvas ref="canvas" width="300px" height="300px">
        you browser dosen't surport canvas
      </canvas>
    </div>
  </div>

</template>

<script>
 import UploadFile from './UploadFile.vue'; 
 import Toolbox from './tool/Toolbox.vue';
 import Drag from './tool/Drag.js';
 import ToolManager from './tool/ToolManager';
  export default {
    name:'image-edit',
    data(){
      return {
        canvas:'',
        toolManager:'',
        zoom:''
      }
    },
    mounted(){
     this.init();
     window.mycvs=this.canvas;
    },
    methods:{
      init(){
        this.canvas=new fabric.Canvas(this.$refs.canvas);
        // this.toolManager=new ToolManager(this.canvas);
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
        //TODO:remove event and state?
        if(value==='drag'){
          // console.log('select drag tool');
          // Drag.selected(this.$refs.canva);
        }
        if(value==='zoom'){
            if(!zoom) this.zoom=new Zoom(this.canvas);
            zoom.selected();
        }
        
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
    /* float:left; */
  }
  canvas{
    border:2px black solid;
    float:left;
  }

</style>



<template>
  <div  id="image-editor" class="">
    <div class="property-bar">
      <upload-file @selected="imageUpload" @save="saveImage"></upload-file>
      <property-component :passproperty="toolProperty" @change="handlePropertyChange"></property-component>
    </div>
    <div class="edit-container flex">
        <toolbox class="" @select="handleToolSelect"></toolbox>
      <div>
        <canvas ref="canvas" width="400px" height="400px">
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
    name:'image-editor',
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
        let self=this;
        this.getImageFromFile(file,function(img){
          let image=new fabric.Image(img);
          image.set({top:10,left:10}).scale(self.calcImageScale(image));
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
        this.toolManager.toolProperty=property;
        // console.log('onchange',property);
      },
      calcImageScale(img){
        let iw=img.width,
            ih=img.height,
            cw=this.canvas.width,
            ch=this.canvas.height,
            imax=iw>ih?iw:ih,
            cmin=cw<ch?cw:ch,
            space=20,
            scale;
        cmin-=space;
        if(imax<=cmin) return 1;
        scale=cmin/imax;
        return scale;

      },
      saveImage(){

      },
      downloadImageFromURL(url,fileName){
        let link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.download = fileName;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        delete link;
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
  #image-editor{
    margin:30px auto;
    max-width:450px;
  }
  body{
    background:#ccc;
  }
  .edit-container{
    position:relative;
  }
  .absolute-left-center{
    position:absolute;
    top:50%;
    right:100%;
    transform:translateY(-50%);
  }
  .flex{
    display:flex;
  }
  .property-bar{
    display:flex;
    flex-wrap:wrap;
    margin:0.75em;
    align-items:center;
  }
  .float-left{
     float:left; 
  }
  .canvas-container{
    background:white;
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
  .btn-basic{
    background:#b3b3b3;
    color:#ece3e3;
  }
  .btn-basic:hover{
    background:#a5a0a0;
  }
  .item-selected{
    color:#4E5DED;
  }
</style>


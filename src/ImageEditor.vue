
<template>
  <div  id="image-edit">
    <upload-file @selected="imageUpload"></upload-file>
    <canvas ref="canvasimg" width="300px" height="300px">
      you browser dose'nt surport canvas
    </canvas>
    <toolbox @select="handleToolSelect"></toolbox>
  </div>

</template>

<script>
 import UploadFile from './UploadFile.vue'; 
 import Toolbox from './tool/Toolbox.vue';
  export default {
    name:'image-edit',
    data(){
      return {

      }
    },
    methods:{
      imageUpload(file){
        this.showImageInCanvas(file);
      },
      showImageInCanvas(file){
        let url=window.URL.createObjectURL(file);
        let img=new Image();
        img.src=url;
        let editor=this;
        img.onload=function(){
          window.URL.revokeObjectURL(this.src);
          let ctx=editor.$refs.canvasimg.getContext('2d');
          ctx.drawImage(img,10,10);
        };
      },
      handleToolSelect(value){
        let ctx=this.$refs.canvasimg.getContext('2d');
        ctx.fillText(value,ctx.canvas.width/2,ctx.canvas.height/2);
      }
    },
    components:{
      UploadFile,
      Toolbox
    }
  }
</script>
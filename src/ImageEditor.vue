
<template>
  <div  id="image-edit">
    <upload-file @selected="imageUpload"></upload-file>
    <canvas ref="canvasimg" width="300px" height="300px">
      you browser dose'nt surport canvas
    </canvas>
  </div>

</template>

<script>
 import UploadFile from './UploadFile.vue'; 
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
      }
    },
    components:{
      UploadFile
    }
  }
</script>
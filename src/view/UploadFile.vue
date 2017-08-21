<template>
  <div id="upload-file">
    <label class="btn">choose a image
    <input type="file" id="image-loader" accept="image/png,image/jpeg,image/gif" @change="onupdate"></label>
    <br><p class="notice" v-if="!isValidType">your file type '<i>{{fileType}}</i>' is not surport</p>
    <!-- <p v-else-if="fileType"><strong>Name:</strong> {{fileName}}<br><strong>Type:</strong> {{fileType}}</p> -->
  </div>

</template>

<script>
 export default {
   name:'upload-file',
   data(){
     return {
        isValidType:true,
        fileType:'',
        fileName:''
     };
   },
   methods:{
     onupdate:function(e){
        if(e.target.files.length===0) return;
        let file=e.target.files[0];
        let validate=this.isFileValidate(file);
        if(validate){
          this.isValidType=true;
          this.fileName=file.name;
          console.log(file.name,file.size);
          this.$emit('selected',file);
        }else{
          this.isValidType=false;
        }
        this.fileType = file.type;
     },
    isFileValidate(file){
      console.log(file.type);
      return file.type&&"image/png,image/jpeg,image/gif".indexOf(file.type)!==-1;
    }
   }
 }
</script>

<<style scoped>
  p{
    font-size:0.8em;
    margin:10px 5px;
  }
  p.notice{
    display:inline-block; 
    border-left:5px #f6b73c solid;
    background:#fff3d4;
    color:black;
    padding:5px;
  }
  p strong{
    color:#6060cc;
  }
  input{
    display:none;
  }
  .btn{
    display:inline-block;
    background:#6060cc; 
    color:white;
    cursor:pointer;
    padding:2px 6px;
    box-shadow:2px 2px 4px rgba(0,0,0,0.2);
    border-radius:4px;
    
  }
</style>

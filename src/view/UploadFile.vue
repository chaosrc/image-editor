<template>
  <div id="upload-file">
    <label class="btn" title="open image"><i class="fa fa-folder-open"></i>
    <input type="file" id="image-loader" accept="image/png,image/jpeg,image/gif" @change="onupdate"></label>
    <span class="btn" @click="onclick" title="save image"><i class="fa fa-floppy-o"></i></span>
    <p class="notice abosulte-bottom" v-if="!isValidType">invalid file '<i>{{fileType}}</i>' </p>
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
          setTimeout(()=>this.isValidType=true,1000);
        }
        this.fileType = file.type;
     },
    onclick(){
      this.$emit('save');
    },
    isFileValidate(file){
      console.log(file.type);
      return file.type&&"image/png,image/jpeg,image/gif".indexOf(file.type)!==-1;
    }
   }
 }
</script>

<<style scoped>
  #upload-file{
    position:relative;
    margin:10px;
    white-space:nowrap;
  }
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
  .abosulte-bottom{
    position:absolute;
    top:100%;
    left:0px;
  }
  p strong{
    color:#6060cc;
  }
  input{
    display:none;
  }
  .btn{
    display:inline-block;
    background:#b3b3b3; 
    color:#4E5DED;
    cursor:pointer;
    padding:2px 6px;
    box-shadow:2px 2px 4px rgba(0,0,0,0.2);
    border-radius:4px;
  }
  .btn:hover{
     background:#a5a0a0;
  }
</style>

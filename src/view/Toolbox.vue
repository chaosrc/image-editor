<template>
  <div id="toolbox">
    <label class="btn-basic btn-hover" v-for="(tool,index) in tools" v-bind:key="tool" :for="tool+icons[index]" :title="tool" >
      <input :id="tool+icons[index]" class="hidden" type="radio" :value="tool" v-on:change="handleSelect" name="imge-tools"><i class="fa tool-item" :class="icons[index]"></i>
    </label>
  </div>
  
</template>
<script>
export default {
  name:"toolbox",
  data(){
    return {
      tools:['drag','text'],
      icons:['fa-search-plus','fa-font']
    }
  },
  methods:{
    handleSelect(e){
      this.$emit('select',e.target.value);
    }
  }
}
</script>
<style scoped>
  #toolbox{
    color:#eee;
    margin:0 5px;
  }
  label{
    display:block;
  }
  .tool-item{
    padding:4px;
    font-size:1.25em;
  }
  input[type="radio"]:checked+.tool-item{
    color:#4E5DED;
  }
  .btn-hover:hover{
    background:#a5a0a0;
  }
  .hidden{
    display:none;
  }
</style>

<template>
  <div id="toolbox">
    <label v-for="(tool,index) in tools" v-bind:key="tool" :for="tool+icons[index]" >
      <input :id="tool+icons[index]" class="hidden" type="radio" :value="tool" v-on:change="handleSelect" name="imge-tools"><i class="fa" :class="icons[index]"></i>
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
  label{
    display:block;
  }
  .hidden{
    display:none;
  }
</style>

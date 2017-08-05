<template>
  <div id="toolbox">
    <label v-for="tool in tools" v-bind:key="tool" >
      <input type="radio" :value="tool" v-on:change="handleSelect" name="imge-tools">{{tool}}
    </label>
  </div>
  
</template>
<script>
import Drag from './Drag.js';
export default {
  name:"toolbox",
  data(){
    return {
      tools:['drag','zoom','selector']
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

</style>

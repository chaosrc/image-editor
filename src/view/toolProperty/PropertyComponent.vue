<template>
  <div id="property-component">
    <div class="margin-10">
     <component :is="currentComponent" :property="property" @change="handleOnChange"></component>
    </div>
  </div>
</template>

<script>
import BasicProperty from './BasicProperty.vue';
import TextProperty from './TextProperty.vue';
import ImageFilter from './ImageFilter.vue';
export default {
  name:'property-component',
  props:['passproperty'],
  data(){
    return {
      
    }
  },
  methods:{
    handleOnChange(pt){
      console.log(pt);
      this.$emit('change',pt);
    }

  },
  computed:{
    property:function(){
      return this.passproperty;
    },
    currentComponent:function(){
      let pt=this.property;
      if(!pt||!pt.type) return;
      if(pt.type==='text'||pt.type==='i-text'){
        return 'fb-text';
      }else if(pt.type==='image'){
        return 'fb-image';
      }
    }
  },
  components:{
    "basic": BasicProperty,
    "fb-text": TextProperty,
    "fb-image":ImageFilter
  }
}
</script>

<style>
  .flex-center{
    display:flex;
    justify-content:center;
  }
  .margin-10{
    margin:10px;
  }
  #property-component{
    /* overflow-x: scroll; */
  }
</style>



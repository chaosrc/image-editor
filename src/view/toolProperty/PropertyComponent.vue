<template>
  <div id="property-component">
    <div>
     <component :is="currentComponent" :property="property" @change="handleOnChange"></component>
    </div>
  </div>
</template>

<script>
import BasicProperty from './BasicProperty.vue';
import TextProperty from './TextProperty.vue';
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
      }else{
        return 'basic';
      }
    }
  },
  components:{
    "basic": BasicProperty,
    "fb-text": TextProperty
  }
}
</script>


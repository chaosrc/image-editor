<template>
  <div id="property-component">
    <div>
     <label> <input type="color" v-model="property.fill" @change="handleOnChange">Color</label>
    </div>


  </div>
</template>

<script>
export default {
  name:'property-component',
  props:['passproperty'],
  data(){
    return {
      
    }
  },
  methods:{
    handleOnChange(){
      console.log(this.property);
      this.$emit('change',this.property);
    }

  },
  computed:{
    property:function(){
      return this.passproperty;
    }
  }
}
</script>


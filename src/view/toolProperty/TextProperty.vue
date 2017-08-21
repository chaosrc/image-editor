<template>
  <div id="text-property">
    <label><input type="color" v-model="_property.fill" @change="handleColorChange">Text Color</label>
  </div>
</template>

<script>
export default {
  name:"text-property",
  props:["property"],
  data(){
    return {

    }
  },
  methods:{
    handleColorChange(){
      this.$emit('change',this._property);
    }
  },
  computed:{
    _property:function(){
      return this.property;
    }
  }
}
</script>

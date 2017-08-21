<template>
  <div id="basic-property">
    <label><input type="color" v-model="_property.fill" @change="handleColorChange">Color</label>
  </div>
</template>

<script>
export default {
  name:"basic-property",
  props:['property'],
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

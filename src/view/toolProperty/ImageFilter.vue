<template>
  <div id="image-filter" class="flex-center">
    <div class="filter-item"
         v-for="(filter,index) in filters" 
         :class="{'item-selected':filter.selected}"  
         :key="filter.name"
         @click="handleSelect(index)"
         >{{filter.name}}</div>
  </div>
</template>

<script>
export default {
  name:"image-filter",
  data(){
    return {
      filters:[
        {name:"Grayscale",value:"Grayscale",selected:false},
        {name:"Invert",value:"Invert",selected:false},
        {name:"Brightness",value:"Brightness",selected:false},
        {name:"Sepia",value:"Sepia",selected:false},
        {name:"Noise",value:"Noise",selected:false}
      ]
    }
  },
  methods:{
    handleSelect(index){
      this.filters[index].selected=!this.filters[index].selected;
      let validFilter=this.filters.filter(v=>v.selected)
                                  .map(v=>v.value);
      this.$emit('change',{type:'image-filter',filters:validFilter});
    }
  }
}
</script>

<style>
  .filter-item{
    display:inline-block;
  }
  .item-selected{
    color:blue;
  }
</style>



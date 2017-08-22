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
  props:["property"],
  data(){
    return {
      filterData:[
        {name:"Grayscale",value:"Grayscale",selected:false},
        {name:"Invert",value:"Invert",selected:false},
        {name:"Brightness",value:"Brightness",selected:false},
        {name:"Sepia",value:"Sepia",selected:false},
        {name:"Noise",value:"Noise",selected:false}
      ]
    }
  },
  computed:{
    filters:function(){
     let fl=this.property.filters||[];
     let fd=this.filterData;
     fd.forEach(v=>{
       let select=fl.some(i=>i===v.value);
       if(select) v.selected=true;
       else v.selected=false;
     });
    //  this.filterData.forEach(i=>{
    //    if(!fl) {
    //      i.seleted=false;
    //      return;
    //    }
    //     fl.forEach(v=>{
    //       if(i.value===v) i.selected=true;
    //       else i.selected=false;
    //     });
    //   });
      console.log('show data',this.filterData);
      return this.filterData;
    }
  },
  methods:{
    handleSelect(index){
      this.filters[index].selected=!this.filters[index].selected;
      let validFilter=this.filters.filter(v=>v.selected)
                                  .map(v=>v.value);
      console.log(validFilter);
      this.$emit('change',{type:'image',filterNames:validFilter});
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



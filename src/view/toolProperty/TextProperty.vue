<template>
  <div id="text-property" class="flex-center">
    <label class="item" title="color"><input class=" btn-basic" type="color" v-model="_property.fill" @change="handleColorChange"></label>
    <select  class="item btn-basic" title="font size" name="font-size" id="font-size" v-model="_property.fontSize"  @change="handleColorChange">
      <option value="" hidden selected disabled>size</option>  
      <option v-for="item in fontSize" 
              :key="item.text" 
              :value="item.value" 
              :selected="item.selected"
              :hidden="item.hidden">{{item.text}}</option>
    </select>
    <select  title="font family" class="item btn-basic" name="font-family" v-model="_property.fontFamily" @change="handleColorChange">
      <option value="" hidden selected disabled>family</option> 
      <option v-for="font in fontFamily" :key="font.text" :value="font.value">{{font.text}}</option>
    </select>

  </div>
</template>

<script>
export default {
  name:"text-property",
  props:["property"],
  data(){
    return {
      fontSize:[
        {value:"10",text:'10px'},
        {value:"16",text:'16px'},
        {value:"20",text:'20px'},
        {value:"24",text:'24px'},
        {value:"32",text:'32px'},
        {value:"40",text:'40px'}
      ],
      fontFamily:[
        {value:"fantasy",text:'fantasy'},
        {value:"cursive",text:'cursive'},
        {value:"monospace",text:'monospace'},
        {value:"sans-serif",text:'sans-serif'},
        {value:"serif",text:'serif'}
        // {valut:"Times New Roman",text:"TNR"}
      ]
    }
  },
  methods:{
    handleColorChange(){
      this.$emit('change',this._property);
    },
    handleSelectChange(e){
      // let target=e.target;
      // let name=target.name;
      // let value=target.value;
    }
  },
  computed:{
    _property:function(){
      return this.property;
    // },
    // fontSize:function(){
    //    let fz=this.property.fontSize;
    //    fz=32;
    //    console.log('size',fz);
    //    let list= [
    //     {value:"10",text:'10px'},
    //     {value:"16",text:'16px'},
    //     {value:"20",text:'20px'},
    //     {value:"24",text:'24px'},
    //     {value:"32",text:'32px'},
    //     {value:"40",text:'40px'}
    //   ];
     
    //   list.forEach((v)=>{
    //     if(v.value==fz) v.selected='true';
    //     else v.selected=false;
    //   })
    //   return list;
     }
  }
}
</script>

<style scoped>
  input[type="color"]{
    width:1.5em;
    height:1.5em;
  }
  .item{
    margin:0 5px;
    font-weight:bolder;
  }
  .item{
     color:#4E5DED;
     }
  .item>option{
    color:white;
  }
</style>


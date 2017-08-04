<template>
  <div id="app">
    <form v-on:submit="addTodo"> 
      <input type="text" v-model="todo">
    </form>
    <ul>
      <li v-for="(item,index) in items" v-bind:key="index">{{item}}<button class="delete-button" @click="deleteItem(index)">+</button></li>
    </ul>
  
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      todo:'',
      items:["apple"]
    }
  },
  methods:{
    addTodo: function(e){
      e.preventDefault()
      this.items.push(this.todo)
      this.todo=''
    },
    deleteItem(i){
      this.items.splice(i,1);
    }
  }

}
</script>

<style lang="scss">
  .delete-button{
    border-radius:50%;
    border:0;
    color:red;
    font-size:1.5em;
    // vertical-align:middle;
    transform:rotate(45deg);
    display:inline-block;
    // background:inherit;
    margin:2px;
    cursor:pointer;
    padding:0px 7px;
    &:active,&:focus{
      outline:0;
      border:0;
    }
  }
  
  
</style>

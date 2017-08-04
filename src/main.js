import Vue from 'vue'
// import App from './App.vue'
import ImageEditor from './ImageEditor.vue'

window.vm=new Vue({
  el: '#app',
  render: h => h(ImageEditor)
})

window.Vue=Vue





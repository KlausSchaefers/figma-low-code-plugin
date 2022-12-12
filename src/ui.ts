import Vue from 'Vue'
import Main from './Main.vue'

import './ui.scss'

const app = new Vue({
  el: '#app',
  render (h) {
    return h('Main')
  },
  components: {
    Main
  }
})

onmessage = (event) => {
  console.log("onmessage() > got this from the plugin code", event)
  let data = event.data.pluginMessage
  app.$emit('onmessage', data)
}
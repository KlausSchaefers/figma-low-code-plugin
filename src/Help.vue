<template>
  <div>
      <div>
          <label class="help-title">Element Type</label>
          <p class="help-content">
            When the Figma design is rendered with with the low code component, you might want certain
            elements to be rendered as real input elements, for instance as in text input field.
            Select the correct widget type in the 'Widget Types' tab.
          </p>
      </div>

      <div>
          <label class="help-title">Data Binding</label>
          <p class="help-content">
            You can 'bind' an element to a variable. For instance you might want to save the value
            of in input field to a variable called 'email'. You can use also a dot notation to such as
            'user.email'.
          </p>
      </div>

      <div>
          <label class="help-title">Method Binding</label>
          <p class="help-content">
            You can specify a method which should be called when in event (click) occours on an element.
            For instance when a user clicks on a button, the method 'login' should be called.
          </p>
      </div>

       <div>
          <label class="help-title">More information</label>
          <p class="help-content">
            You can find more information and a project to clone at https://github.com/KlausSchaefers/figma-low-code
          </p>
      </div>

</div>

</template>
<style >

</style>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import qSelect from './qSelect.vue'
Vue.component('qSelect', qSelect)

@Component({
  name: 'Main'
})
export default class Main extends Vue {



  mounted () {

  }
}
</script>

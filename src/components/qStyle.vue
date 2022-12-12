<template>
      <div class="qux-style">

        <div class="qux-style-cntr">
          <qColor v-model="value.background" :colors="colors" tooltip="Select Hover Fill Style" label="Fill" type="background" @show="show"/>
          <qColor v-model="value.border" :colors="colors" tooltip="Select Hover Stroke Style" label="Stroke" type="border" @show="show"/>
          <qColor v-model="value.color" :colors="colors" tooltip="Select Hover Text Style" label="Text" type="color" @show="show"/>
        </div>

        <div v-if="isVisible" class="qux-popup" @click.stop="">

              <span v-for="c in colors"
                @click="setValue(c.value)"
                :key="c.value"
                :class="['qux-popup-item', {'qux-popup-item-selected ': c.value === selectecColor}]">
                <span :class="['qux-popup-item-icon icon--white ', {'icon--check' : c.value === selectecColor}]" />
                <span class="qux-popup-item-color" :style="'background:' + c.value"/>
                <span class="qux-popup-item-label">
                    {{c.label}}
                </span>
              </span>
          </div>
      </div>


</template>
<style >

</style>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from 'vue-property-decorator'

import qColor from './qColor.vue'
Vue.component('qColor', qColor)

@Component({
  name: 'qStyle'
})
export default class Main extends Vue {

    @Prop() colors: any

    @Prop() value: any

    @Prop() type: any

    @Prop() placeholder: any

    isVisible: boolean = false

    selectedType: string = ''

    selectecColor: string = ''

    get sortedColors () {
      if (this.colors) {
        return this.colors.sort((a: string, b:string) => {
          return a.localeCompare(b)
        })
      }
      return []
    }

    show (color: string, type: string) {
        console.debug('qStyle.show()', type, color)
        this.$root.$emit('onPopupClose')
        this.selectedType = type
        this.selectecColor = color
        this.isVisible = !this.isVisible
    }

    close () {
        console.debug('qStyle.close()')
        this.isVisible = false
        this.selectedType = ''
        this.selectecColor = ''
    }

    setValue (color: any) {
        console.debug('qStyle.setValue()', color)
        this.value[this.selectedType] = color
        this.$emit('change', this.value)
        this.close()
    }


    mounted () {
        console.debug('qStyle.mounted', this.value, this.colors)
        this.$root.$on('onPopupClose', this.close)
    }
}
</script>

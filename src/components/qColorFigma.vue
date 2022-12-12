<template>

    <div class="qux-color-figma">
        <div @click="show" class="qux-color-figma-button">
            <div class="qux-color-figma-inputs">
                <div class="qux-color-figma-button-values" >
                    <span class="qux-color-figma-button-box" :style="color" @click.stop="show"></span>
                    <input class="qux-color-figma-button-hex" :value="hex" @click="focusInput" />
                </div>
                <input class="qux-color-figma-button-alpha" :value="alpha" @click="focusInput"/>
            </div>
            <span class="qux-color-button-label">{{label}}</span>
        </div>
        <div v-if="isVisible" class="qux-popup" @click.stop="">
             <span v-for="c in colors"
                @click="setValue(c)"
                :key="c"
                :style="'background:' + c"
                :class="['qux-popup-item', {'qux-select-item-selected ': c === value}]">
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

@Component({
  name: 'qColor'
})
export default class Main extends Vue {

    @Prop() colors: any

    @Prop() value: any

    @Prop() label: any

    @Prop() placeholder: any

    isVisible: boolean = false

    get hex () {
        return this.value
    }

    get alpha () {
        return '100%'
    }

    get sortedColors () {
      if (this.colors) {
        return this.colors.sort((a: string, b:string) => {
          return a.localeCompare(b)
        })
      }
      return []
    }

    get color () {
      if (this.value !== undefined) {
        return `background: ${this.value};`
      }
      return `background: white;`
    }

    show () {
        console.debug('qFigmaColor.show()')
        this.$root.$emit('onPopupClose')
        this.isVisible = true
    }

    close () {
        this.isVisible = false
    }

    setValue (value: any) {
        console.debug('qFigmaColor.setValue()', value)
        this.$emit('input', value)
        this.close()
    }

    focusInput (e: any) {
        const target = e.target
        target.select()
        target.focus()
    }


    mounted () {
        console.debug('qFigmaColor mounted', this.value)
        this.$root.$on('onPopupClose', this.close)
    }
}
</script>

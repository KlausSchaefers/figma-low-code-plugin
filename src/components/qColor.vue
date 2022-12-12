<template>

    <div class="qux-color" @click.stop="onClick">
        <div class="qux-color-button">
            <span class="qux-color-button-box" :style="color"></span>
            <span class="qux-color-button-label">{{label}}</span>
            <span class="carret" />
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

    @Prop() value: any

    @Prop() label: any

    @Prop() type: any

    @Prop() placeholder: any

    isVisible: boolean = false

    get alpha () {
        return '100%'
    }

    onClick () {
        this.$emit('show', this.value, this.type)
    }

    get color () {
      if (this.value !== undefined && this.value !== '') {
        return `background: ${this.value};`
      }
      return `background: linear-gradient( 145deg,#fff 47%,#ed0000 48%,#ed0000 52%,#fff 53%); background-repeat: no-repeat;;`
    }
}
</script>

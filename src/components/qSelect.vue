<template>

    <div class="qux-select">
        <div @click="show" class="qux-select-button">
            <span class="qux-select-button-label">{{label}} </span>
            <span class="carret" />
        </div>
        <div v-if="isVisible" class="qux-popup" @click.stop="">
            <span
                v-for="option in options"
                :key="option.value"
                @click.stop="setValue(option.value)"
                :class="['qux-popup-item', {'qux-popup-item-selected ': isSelected(option)}]">
                <span :class="['qux-popup-item-icon icon--white ', {'icon--check' : isSelected(option)}]" />
                <span class="qux-popup-item-label">
                    {{option.label}}
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

@Component({
  name: 'qSelect'
})
export default class Main extends Vue {

    @Prop() options: any

    @Prop() value: any

    @Prop() placeholder: any

    isVisible: boolean = false

    isSelected (option:any) {
        return option.value === this.value || option.value === undefined
    }

    get label(): string {
        let selected = this.options.find((o:any) => o.value == this.value)
        if (selected) {
            return selected.label
        }
        if (this.value) {
            return this.value
        }
        return this.placeholder
    }

    show () {
        this.isVisible = !this.isVisible
    }

    close () {
        this.isVisible = false
    }

    setValue (value: any) {
        console.debug('qSelect.setValue()', value)
        this.$emit('input', value)
        this.$emit('change', value)
        this.close()
    }

    mounted () {
        console.debug('qSelect mounted', this.value)
    }
}
</script>

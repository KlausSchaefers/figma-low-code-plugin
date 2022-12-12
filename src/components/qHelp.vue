<template>

    <div class="qux-help">
      <div class="section">
            <label class="section-header">About</label>
            <p class="qux-help-content">
                The Figma-Low-Code project was created by Klaus Schaefers and Sascha Lichtenstein. For
                more information, help and tutorials visit our
                <a href="https://github.com/KlausSchaefers/figma-low-code" target="_git">Github page</a> or
                <a href="https://www.youtube.com/channel/UC433NvRp6OeA5uewcYV15HA?guided_help_flow=3" target="_youtube">YouTube channel</a>
            </p>
            <p class="qux-help-content">
              Please do not forget to give us a star, if you like the project.
            </p>
        </div>

        <div class="section border-section">
            <label class="section-header">Types</label>
            <p class="qux-help-content">
                Figma knows only graphic types such as rectangles or vectors. In a real application, however,
                you might want use other types, such as Input fields or so on. You can specify the type
                of element use to use here.
            </p>
            <p class="qux-help-content">
                The <b>SmartContainer</b> type allows you to repeat the embedded elements or toggle then
                on user interactions. Repeating elements allows to create dynamic lists, whereas toggling the
                visibility of child elements, allows to create checkboxes.
            </p>
            <p class="qux-help-content">
                The <b>Custom</b> type allows you to introduce your own class during rendering. Just enter
                the name of the class to be used. This option gives you the most freedom. More details on how to
                implement your class can be found at our
                <a href="https://github.com/KlausSchaefers/figma-low-code" target="_git">documentation</a>.
            </p>
        </div>

        <div class="section border-section">
            <label class="section-header">Method Binding</label>
            <p class="qux-help-content">
                Method binding allows you to specify actions that should be executed on certain events.
                In Figma, you just define the name of the function (method) to be called.
                The implementation of the methods has to happen out side of Figma, in the project.
            </p>
            <p class="qux-help-content">
               <b>Click</b> events are fired when the user clicks on an elemeent.
            </p>
             <p class="qux-help-content">
               <b>Change</b> events are fired when the value of an element, e.g. an inout field, changes
            </p>
             <p class="qux-help-content">
               <b>Page Load</b> is fired when a screen is loaded and can for example
               be used to retrieve data from a backend.
            </p>
        </div>

        <div class="section border-section">
            <label class="section-header">Data Binding</label>
            <p class="qux-help-content">
                Data binding enables the connection between your design and backend data. One simply has
                specify the name of the data variable, e.g. "userName". Please note that also JSON path statements are allowed,
                e.g. "user.name"
            </p>
        </div>

    </div>


</template>
<style >

</style>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
//import {Prop} from 'vue-property-decorator'

@Component({
  name: 'qColor'
})
export default class Main extends Vue {


}
</script>

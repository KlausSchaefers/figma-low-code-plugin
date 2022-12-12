
<template>
  <div class="qux-figma-main" @click="onBodyClick">
    <div class="tab-bar">
      <span @click="tab = 'screen'" :class="{'tab-selected': tab === 'screen'}"  v-if="hasScreen && hasTabBar">
        Screen
      </span>
      <span @click="tab = 'widget'" :class="{'tab-selected': tab === 'widget'}"  v-if="hasWidgets && hasTabBar">
        Low Code
      </span>
      <span @click="tab = 'options'" :class="{'tab-selected': tab === 'options'}"  v-if="hasWidgets && hasTabBar && hasDataBindings">
        Options
      </span>
      <span @click="tab = 'style'" :class="{'tab-selected': tab === 'style'}" v-if="hasWidgets && hasTabBar && hasStyles">
        Styles
      </span>

      <span @click="tab = 'help'" :class="{'tab-selected': tab === 'help'}">
        Help
      </span>
    </div>
    <div class="tab-content-cntr">

      <!-- type tab -->

      <div class="tab-content" v-if="tab === 'screen'">

          <div class="section">

            <label class="section-header">Screen</label>

            <div class="checkbox">
              <input id="quxScreenStart" type="checkbox" class="checkbox__box" :checked="currentElement.quxStartScreen === 'true'" @change="setStartScreen">
              <label for="quxScreenStart" class="checkbox__label">Start Screen</label>
            </div>

            <div class="checkbox">
              <input id="quxScreenOverlay" type="checkbox" class="checkbox__box" :checked="currentElement.quxOverlayScreen === 'true'" @change="setOverlay">
              <label for="quxScreenOverlay" class="checkbox__label">Overlay</label>
            </div>

            <div class="checkbox" v-if="currentElement.quxOverlayScreen">
              <input id="quxHasOverlayBackground" type="checkbox" class="checkbox__box" :checked="currentElement.quxHasOverlayBackground === 'true'" @change="setOverlayBackground">
              <label for="quxHasOverlayBackground" class="checkbox__label">Keep Background</label>
            </div>


          </div>

          <div class="section border-section" v-if="hasDataBindings">

            <label class="section-header">Method Binding</label>
            <div class="labeled-input">
              <input type="input" v-model="currentElement.quxOnLoadCallback" class="input__field" placeholder="Enter method name">
              <label class="label type--bold">Page load</label>
            </div>

          </div>

          <div class="section border-section" v-if="hasDataBindings">

            <label class="section-header">SEO</label>
            <div class="labeled-input">
              <input type="input" v-model="currentElement.quxMetaKeyWords" class="input__field" placeholder="Meta tag keywords">
              <label class="label type--bold">Keywords</label>
            </div>
            <div class="labeled-input">
              <input type="input" v-model="currentElement.quxMetaDescription" class="input__field" placeholder="Meta description">
              <label class="label type--bold">Description</label>
            </div>

          </div>



      </div>


      <div class="tab-content" v-if="tab === 'widget'">

          <div class="section" v-if="false">
              <label class="section-header">Target Platform</label>
              <qSelect v-model="targetPlatform" :options="targetPlatformOptions" @change="setTargetPlatform" />
          </div>


          <div class="section">

            <label class="section-header">Element Type</label>
            <div v-for="type in widgetTypesByPlatform" :key="type.value">
              <div class="radio" >
                  <input
                      :id="'quxType-' + type.value"
                      type="radio"
                      class="radio__button"
                      :value="type.value"
                      name="quxTypes"
                      v-model="currentElement.quxType"
                      @change="setType" >
                  <label :for="'quxType-' + type.value"  class="radio__label">{{type.label}}</label>
              </div>
              <!-- show children for smart conatiner -->
               <div v-if="hasSmartContainer && type.value === 'SmartContainer'" class="radio-sub-list">
                  <div class="radio" v-for="type in smartContainerTypes" :key="type.value">
                    <input
                      :id="'quxType-' + type.value"
                      type="radio"
                      class="radio__button"
                      :value="type.value" name="quxSmartContainerTypes"
                      v-model="currentElement.quxSmartContainerType" >
                    <label :for="'quxType-' + type.value"  class="radio__label">{{type.label}}</label>
                  </div>
                </div>
            </div>


            <div v-if="hasCustom" class="radio-sub-list">
              <div class="input">
                <input type="input" v-model="currentElement.quxTypeCustom" class="input__field" placeholder="Enter name of custom component" />
              </div>
            </div>
          </div>



      </div>

      <!-- data binding tab -->

      <div class="tab-content" v-if="tab === 'options'">


            <div class="section ">
              <label class="section-header">Method Binding</label>

              <div class="labeled-input">
                <input type="input" v-model="currentElement.quxOnClickCallback" class="input__field" placeholder="Enter method name" @change="save">
                <label class="label type--bold">Click</label>
              </div>

              <div v-if="hasChangeMethod">

                <div class="labeled-input">
                  <input type="input" v-model="currentElement.quxOnChangeCallback" class="input__field" placeholder="Enter method name" @change="save">
                  <label class="label type--bold">Change</label>
                </div>
              </div>

            </div>

            <div class="section border-section">

              <label class="section-header">Data Binding</label>
              <template v-if="!hasOutputDatabinding">

                <div class="labeled-input">
                  <input type="input" v-model="currentElement.quxDataBindingDefault" class="input__field" placeholder="Enter name of variable " @change="save">
                  <label class="label type--bold">Input / Output</label>
                </div>

              </template>

              <template v-else>

                <div class="labeled-input">
                  <input type="input" v-model="currentElement.quxDataBindingDefault" class="input__field" placeholder="Enter name of variable" @change="save">
                  <label class="label type--bold">Input</label>
                </div>

                <div class="labeled-input">
                  <input type="input" v-model="currentElement.quxDataBindingOutput" class="input__field" placeholder="Enter name of selected variable" @change="save">
                  <label class="label type--bold">Output</label>
                </div>

              </template>

              <div class="labeled-input" v-if="hasOptionsDatabinding">
                  <input type="input" v-model="currentElement.quxDataBindingOptions" class="input__field" placeholder="Enter name of variable " @change="save">
                  <label class="label type--bold">Options</label>
              </div>

            </div>

            <div class="section border-section" v-if="currentElement.quxType !== 'Link'">
              <label class="section-header">Data Value</label>
                <div class="labeled-input">
                  <input type="input" v-model="currentElement.quxDataValue" class="input__field" placeholder="Value to emit" @change="save">
                  <label class="label type--bold">Value</label>
                </div>
            </div>

            <div class="section border-section" v-else>
              <label class="section-header">Link URL</label>
                <div class="labeled-input">
                  <input type="input" v-model="currentElement.quxLinkUrl" class="input__field" placeholder="Website to open" @change="save">
                  <label class="label type--bold">URL</label>
                </div>
            </div>


          <div class="section border-section" v-if="hasOptions">
              <label class="section-header">Options</label>
              <div class="labeled-input" v-for="(option,i) in options" :key="i">
                <input type="input" :value="option" class="input__field" placeholder="Clear to remove" @change="onOptionChange(i, $event)">
              </div>
              <div class="labeled-input" >
                  <input type="input" v-model="addOptionValue" placeholder="Add new option" class="input__field" @change="addOption">
              </div>
          </div>
      </div>


      <!-- otpions binding tab -->

      <div class="tab-content" v-if="tab === 'style'">

          <!--
          <div class="section">
             <label class="section-header">Constrains</label>
             <div class="checkbox">
                <input id="quxFixedHorizontal" type="checkbox" class="checkbox__box" :checked="currentElement.quxFixedHorizontal === 'true'" @change="setFixedHorizontal">
                <label for="quxFixedHorizontal" class="checkbox__label">Fixed Horizontal</label>
              </div>


              <div class="checkbox">
                <input id="quxFixedVertical" type="checkbox" class="checkbox__box" :checked="currentElement.quxFixedVertical === 'true'" @change="setFixedVertical">
                <label for="quxFixedVertical" class="checkbox__label">Fixed Vertical</label>
              </div>

          </div>

          -->

       <div class="section">
              <div class="">
                <label class="section-header">Hover</label>
                <qStyle :value="hover" @change="setHover" :colors="styles.colors"/>
              </div>
          </div> <!-- hover section -->

          <div v-if="hasFocusStyle" class="section border-section">
                <div class="" >
                  <label class="section-header">Focus</label>
                  <qStyle :value="focus" @change="setFocus" :colors="styles.colors"/>
                </div>
          </div> <!-- focus section -->

          <div v-if="hasDropDownStyle" class="section border-section">
                <div class="" >
                  <label class="section-header">DropDown</label>
                  <qStyle :value="dropdown" @change="setDropDown" :colors="styles.colors"/>
                </div>
          </div> <!-- dropdown section -->

          <div class="section border-section">
            <label class="section-header">Responsive </label>

            <div class="labeled-input">
                <input type="input" v-model="currentElement.quxStyleMinWidth" class="input__field" placeholder="Min Width" @change="save">
                <label class="label type--bold">Min Width</label>
            </div>

            <div class="labeled-input">
                <input type="input" v-model="currentElement.quxStyleMaxWidth" class="input__field" placeholder="Max Width" @change="save">
                <label class="label type--bold">Max Width</label>
            </div> <!-- win max width section -->

            <div class="checkbox">
              <input id="quxWrapContent" type="checkbox" class="checkbox__box" :checked="currentElement.quxWrapContent === 'true'" @change="setWrap">
              <label for="quxWrapContent" class="checkbox__label">Wrap Content</label>
            </div>

          </div>





           <div class="section border-section">

              <label class="section-header">Cursor</label>
              <div v-for="type in cursorTypes" :key="type.value">
                <div class="radio" >
                    <input
                        :id="'quxCursorType-' + type.value"
                        type="radio"
                        class="radio__button"
                        :value="type.value"
                        name="quxCursorTypes"
                        v-model="currentElement.quxStyleCursor"
                        @change="setCursor" >
                    <label :for="'quxCursorType-' + type.value"  class="radio__label">{{type.label}}</label>
                </div>
              </div>

          </div>   <!-- cursor section -->



          <div class="section border-section">

            <label class="section-header">Display</label>

            <div v-for="type in displayValues" :key="type.value">
                <div class="radio" >
                    <input
                        :id="'quxDisplayType-' + type.value"
                        type="radio"
                        class="radio__button"
                        :value="type.value"
                        name="quxDisplayTypes"
                        v-model="currentElement.quxStyleDisplay"
                        @change="setDisplay" >
                    <label :for="'quxDisplayType-' + type.value"  class="radio__label">{{type.label}}</label>
                </div>
              </div>

          </div>  <!-- display section -->


           <!--
            <div class="labeled-input" v-if="hasChildrenLayout">
              <qSelect v-model="currentElement.quxChildLayout" :options="layoutOptions" placeholder="Default"/>
              <label class="label">Children alignment</label>
            </div>


            <div class="labeled-input" v-if="hasRepeater">
              <qSelect v-model="currentElement.quxChildLayout" :options="repeaterLayouts" placeholder="Rows"/>
              <label class="label">Children alignment</label>
            </div>

           -->

          <div class="section border-section">

            <label class="section-header">Breakpoints</label>

            <div class="checkbox">
              <input id="quxBreakpointMobile" type="checkbox" class="checkbox__box" :checked="currentElement.quxBreakpointMobile === 'true'" @change="setBreakpointMobile">
              <label for="quxBreakpointMobile" class="checkbox__label">Phone</label>
            </div>

            <div class="checkbox">
              <input id="quxBreakpointTablet" type="checkbox" class="checkbox__box" :checked="currentElement.quxBreakpointTablet === 'true'" @change="setBreakpointTablet">
              <label for="quxBreakpointTablet" class="checkbox__label">Tablet</label>
            </div>

            <div class="checkbox">
              <input id="quxBreakpointDesktop" type="checkbox" class="checkbox__box" :checked="currentElement.quxBreakpointDesktop === 'true'" @change="setBreakpointDesktop">
              <label for="quxBreakpointDesktop" class="checkbox__label">Desktop</label>
            </div>

          </div>  <!-- break points section -->



      </div>

      <!-- error tab -->

      <div class="tab-content" v-if="tab === 'error'">
          <div class="section">
            <label class="section-header">No Selection</label>
            <p class="qux-help-content">
                The plugin works only for single selections.
            </p>
          </div>
      </div>

      <!-- help tab -->

      <div class="tab-content" v-if="tab === 'help'">
        <qHelp />
      </div>


      <!-- loading binding tab -->
      <div class="tab-content" v-if="tab === 'loading'">
        <label class="help-title">Loading....</label>
      </div>

    </div>

    <!-- buttons -->

    <div class="qux-figma-buttonbar">

        <button class="button button--primary" @click="close">
          Close
        </button>


    </div>
  </div>
</template>
<style >

</style>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import qSelect from './components/qSelect.vue'
import qStyle from './components/qStyle.vue'
import qColorFigma from './components/qColorFigma.vue'
import qHelp from './components/qHelp.vue'

Vue.component('qSelect', qSelect)
Vue.component('qStyle', qStyle)
Vue.component('qColorFigma', qColorFigma)
Vue.component('qHelp', qHelp)

@Component({
  name: 'Main'
})
export default class Main extends Vue {

  tab: String = 'loading'

  selection: any[] = []

  styles: any = {}

  selectionIndex: number = 0

  hasTabBar: boolean = true

  hasScreen: boolean = true

  hasWidgets: boolean = true

  hasCreateButton: boolean = true

  quxType: String = 'Retangle'

  quxDataBindingDefault: String = ''

  quxOnClickCallback: String = ''

  addOptionValue: String = ''

  targetPlatform: String = 'vue'

  targetPlatformOptions: any = [
    {value: 'vue', label: 'Figma Low Code (Vue)'},
    {value: 'tkinter', label: 'Tkinter-Designer (Python)'},
  ]

  cursorTypes: any = [
    {value: '', label: 'Default'},
    {value: 'pointer', label: 'Pointer'}
  ]

  displayValues: any = [
    {value: '', label: 'Inline'},
    {value: 'block', label: 'Block (New Line)'}
  ]


  smartContainerTypes : any = [
    {value: 'Repeater', label: 'Repeat Children'},
    {value: 'ChildrenToggle', label: 'Toggle Children'},
  ]

  layoutOptions: any = [
      {label: 'Default', value: 'Grid'},
      {label: 'Rows', value: 'Row'},
      {label: 'Colums', value: 'Col'},
      {label: 'Wrap', value: 'Wrap'}
  ]

  repeaterLayouts: any = [
      {label: 'Grid', value: 'Grid'},
      {label: 'Rows', value: 'Row'}
  ]

  /**
   * Computed
   */

  get widgetTypesByPlatform () {
      if (this.targetPlatform === 'tkinter' ) {
      return [
          {value: '', label: 'Default'},
          {value: 'TextBox', label: 'Input Field'},
          {value: 'Image', label: 'Image'},
          {value: 'Password', label: 'Password Field'},
          {value: 'TextArea', label: 'Text Area'}
      ]
    }
    return [
          {value: '', label: 'Default'},
          {value: 'TextBox', label: 'Input Field'},
          {value: 'Vector', label: 'Vector Group'},
          {value: 'Image', label: 'Dynamic Image'},
          {value: 'Password', label: 'Password Field'},
          {value: 'TextArea', label: 'Text Area'},
          {value: 'DropDown', label: 'DropDown'},
          {value: 'SmartContainer', label: 'Smart Container'},
          {value: 'Link', label: 'Link'},
          {value: 'Custom', label: 'Custom'}
      ]
  }

  get hasDataBindings () {
    return this.targetPlatform === 'vue' || this.targetPlatform === 'figmagic'
  }

  get hasStyles () {
    return this.targetPlatform === 'vue' || this.targetPlatform === 'figmagic'
  }
  get hasFocusStyle () {
    return this.currentElement.quxType === 'TextBox' || this.currentElement.quxType === 'TextArea' || this.currentElement.quxType === 'Password'
  }

  get hasDropDownStyle () {
    return this.currentElement.quxType === 'DropDown'
  }

  get hasOutputDatabinding () {
    return (this.currentElement.quxType === 'SmartContainer' && this.currentElement.quxSmartContainerType === 'Repeater')
  }

  get hasOptionsDatabinding () {
    return this.currentElement.quxType === 'DropDown'
  }


  get hasOptions () {
    return this.currentElement && this.currentElement.quxType === 'DropDown'
  }


  get hasChangeMethod () {
    return this.currentElement.quxType === 'TextBox' || this.currentElement.quxType === 'TextArea' || this.currentElement.quxType === 'Password' || this.currentElement.quxType === 'DropDown'
  }
  get hasChildrenLayout () {
    return this.currentElement.quxType === 'Box' || !this.currentElement.quxType
  }
  get hasCustom () {
    return this.currentElement.quxType === 'Custom'
  }
  get hasSmartContainer () {
    return this.currentElement.quxType === 'SmartContainer'
  }
  get hasRepeater () {
    return this.currentElement.quxType === 'SmartContainer' && this.currentElement.quxSmartContainerType === 'Repeater'
  }

  get currentElement () {
    return this.selection[this.selectionIndex]
  }

  get options () {
    if (this.currentElement.quxOptions) {
      return this.currentElement.quxOptions.split(';')
    }
    return []
  }


  /**
   * Styles
   */
  get focus () {
    if (this.currentElement) {
      return {
        background: this.currentElement.quxStyleFocusBackground,
        border: this.currentElement.quxStyleFocusBorder,
        color: this.currentElement.quxStyleFocusColor
      }
    }
    return {}
  }
  setFocus (focus: any) {
    if (this.currentElement) {
      console.debug('Main.setFocus()', focus)
      this.currentElement.quxStyleFocusBackground = focus.background
      this.currentElement.quxStyleFocusBorder = focus.border
      this.currentElement.quxStyleFocusColor = focus.color
    }
  }

  get hover () {
    if (this.currentElement) {
      return {
        background: this.currentElement.quxStyleHoverBackground,
        border: this.currentElement.quxStyleHoverBorder,
        color: this.currentElement.quxStyleHoverColor
      }
    }
    return {}
  }
  setHover (hover: any) {
    if (this.currentElement) {
      console.debug('Main.setHover()', hover)
      this.currentElement.quxStyleHoverBackground = hover.background
      this.currentElement.quxStyleHoverBorder = hover.border
      this.currentElement.quxStyleHoverColor = hover.color
    }
  }

  get dropdown () {
    if (this.currentElement) {
      return {
        background: this.currentElement.quxStyleDropDownBackground,
        border: this.currentElement.quxStyleDropDownBorder,
        color: this.currentElement.quxStyleDropDownColor
      }
    }
    return {}
  }
  setDropDown (hover: any) {
    if (this.currentElement) {
      console.debug('Main.setDropDown()', hover)
      this.currentElement.quxStyleDropDownBackground = hover.background
      this.currentElement.quxStyleDropDownBorder = hover.border
      this.currentElement.quxStyleDropDownColor = hover.color
    }
  }

  /**
   * Options
   */

  onOptionChange (i: any, e:any) {
    console.debug('onOptionChange', i, e)
    let options = []
    if (this.currentElement.quxOptions) {
      options = this.currentElement.quxOptions.split(';')
    }
    let value = e.target.value
    options[i] = value
    options = options.filter((o:String) => o !== '')
    Vue.set(this.currentElement, 'quxOptions', options.join(';'))
  }

  addOption (e: any) {
    console.debug('addOptopn', e)
    let options = []
    if (this.currentElement.quxOptions) {
      options = this.currentElement.quxOptions.split(';')
    }
    let value = this.addOptionValue
    options.push(value)
    Vue.set(this.currentElement, 'quxOptions', options.join(';'))
    console.debug(options, this.currentElement.quxOptions)
    this.addOptionValue = ''
  }

  /**
   * Setters
   */
  setStartScreen () {
    this.currentElement.quxStartScreen = this.currentElement.quxStartScreen === 'true' ? 'false' : 'true'
    this.save()
  }
  setOverlay () {
    this.currentElement.quxOverlayScreen = this.currentElement.quxOverlayScreen === 'true' ? 'false' : 'true'
    this.save()
  }
  setOverlayBackground () {
    this.currentElement.quxHasOverlayBackground = this.currentElement.quxHasOverlayBackground === 'true' ? 'false' : 'true'
    this.save()
  }
  setFixedHorizontal () {
    this.currentElement.quxFixedHorizontal = this.currentElement.quxFixedHorizontal === 'true' ? 'false' : 'true'
    this.save()
  }
  setFixedVertical () {
    this.currentElement.quxFixedVertical = this.currentElement.quxFixedVertical === 'true' ? 'false' : 'true'
    this.save()
  }
  setWrap () {
    this.currentElement.quxWrapContent = this.currentElement.quxWrapContent === 'true' ? 'false' : 'true'
    this.save()
  }
  setBreakpointTablet () {
    this.currentElement.quxBreakpointTablet = this.currentElement.quxBreakpointTablet === 'true' ? 'false' : 'true'
    this.save()
  }
  setBreakpointDesktop () {
    this.currentElement.quxBreakpointDesktop = this.currentElement.quxBreakpointDesktop === 'true' ? 'false' : 'true'
    this.save()
  }
  setBreakpointMobile () {
    this.currentElement.quxBreakpointMobile = this.currentElement.quxBreakpointMobile === 'true' ? 'false' : 'true'
    this.save()
  }
  setCursor () {
    console.debug('Main.setCursor() ', this.currentElement.quxStyleCursor)
    this.save()
  }
  setDisplay () {
    console.debug('Main.setDisplay() ', this.currentElement.quxStyleDisplay)
    this.save()
  }
  setType () {
    /**
     * Make sure we have a default
     */
    if (this.currentElement.quxType === 'SmartContainer' && !this.currentElement.quxSmartContainerType) {
      this.currentElement.quxSmartContainerType = 'Repeater'
    }
    this.save()
  }
  setTargetPlatform (v: any) {
   console.debug('Main.setTargetPlatform() ', this.targetPlatform, v)
   if (window.localStorage) {
     window.localStorage.setItem('quxTargetPlatform', v)
   } else {
     console.error('Main.setTargetPlatform() No localStorage')
   }
  }

  /**
   * Methods
   */
  close () {
    console.debug('Main.close()')
    this.save()
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  }

  save () {
    console.debug('Main.save()', JSON.stringify(this.selection))
    if (this.currentElement) {
      parent.postMessage({ pluginMessage: { type: 'save', elements: this.selection}}, '*')
    } else {
      console.debug('Main.save() Nothing to save')
    }
  }

  cancel () {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  }

  setSelection (selection: any[]) {
    console.log('Main.setSelection', selection)
    this.selection = selection
    if (selection.length === 1) {
      this.hasTabBar = true
      this.selectionIndex = 0
      const element = selection[0]
      if (this.isScreen(element)) {
        this.tab = 'screen'
        this.hasScreen = true
        this.hasWidgets = false
      } else {
        if (this.tab === 'screen' || this.tab === 'loading' || this.tab === 'error') {
          this.tab = 'widget'
        }
        this.hasScreen = false
        this.hasWidgets = true
      }
    } else {
      this.tab = 'error'
      this.hasTabBar = false
      this.hasCreateButton = false
    }
  }

  isScreen (element: any) {
    return element.fType === 'FRAME' &&element.fIsScreen === true
  }

  setStyles (styles: any) {
    console.log('Main.setStyles()', styles)
    this.styles = styles
  }

  onMessage (msg: any) {
    if (msg && msg.type === 'onLoad') {
      console.log('Main.onMessage(onLoad)', msg)
      this.setSelection(msg.data)
      this.setStyles(msg.styles)
    }
    if (msg && msg.type === 'onSelectionChange') {
      console.log('Main.onMessage(onSelectionChange)', msg)
      this.save()
      this.setSelection(msg.data)
      this.setStyles(msg.styles)
    }
  }

  onBodyClick () {
    console.log('Main.onBodyClick()', this.$refs.popups)
    this.$root.$emit('onPopupClose')
  }

  mounted () {
    this.$root.$on('onmessage', this.onMessage)
    parent.postMessage({ pluginMessage: { type: 'load' } }, '*')
    if (window.localStorage) {
      let targetPlatform = window.localStorage.getItem('quxTargetPlatform')
      if (targetPlatform) {
        this.targetPlatform = targetPlatform
      }
    }
  }
}
</script>

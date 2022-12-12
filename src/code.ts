// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);
figma.ui.resize(300, 650)

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.

const quxKeys = [
  'quxType',
  'quxTypeCustom',
  'quxStartScreen',
  'quxDataBindingDefault',
  'quxDataBindingInput',
  'quxDataBindingOutput',
  'quxOnClickCallback',
  'quxOnLoadCallback',
  'quxOnChangeCallback',
  'quxStyleHoverBackground',
  'quxStyleHoverBorder',
  'quxStyleHoverColor',
  'quxStyleFocusBackground',
  'quxStyleFocusBorder',
  'quxStyleFocusColor',
  'quxOverlayScreen',
  'quxHasOverlayBackground',
  'quxSmartContainerType',
  'quxFixedHorizontal',
  'quxFixedVertical',
  'quxBreakpointMobile',
  'quxBreakpointTablet',
  'quxBreakpointDesktop',
  'quxStyleCursor',
  'quxStyleMinWidth',
  'quxStyleMaxWidth',
  'quxStyleDisplay',
  'quxChildLayout',
  'quxWrapContent',
  'quxDataValue',
  'quxLinkUrl',
  'quxMetaKeyWords',
  'quxMetaDescription',
  'quxDataBindingOptions',
  'quxOptions'
]

/**
 * Notify teh widget the the selection has changed
 */
figma.on("selectionchange", () => {
  console.log('code.selectionchange()')
  load('onSelectionChange')
})

/**
 * Dispatcher to real methods
 */
figma.ui.onmessage = msg => {
  if (msg.type === 'save') {
    save(msg)
  }
  if (msg.type === 'load') {
    load()
  }
  if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};

let styles = getStyles()


function load(msgType= 'onLoad') {
  console.log('code.load()', msgType)
  const selectedElements: any[] = []
  let selection = figma.currentPage.selection
  selection.forEach((fElement, i) => {
    let selectedElement : any = {
      fId: fElement.id,
      fName: fElement.name,
      fType: fElement.type,
      fIsScreen: isScreen(figma.currentPage, fElement),
      fSelection: i
    }
    quxKeys.forEach( (key:any) => {
      let value = fElement.getPluginData(key)
      if (value) {
        selectedElement[key] = value
      } else {
        selectedElement[key] = ''
      }
    })
    selectedElements.push(selectedElement)
  })

  figma.ui.postMessage({'type': msgType, data: selectedElements, styles: styles})
  console.log('code.load() > exit')
}

function isScreen (page: any, element: any) {
  if (page.children) {
    let matches = page.children.filter( (child: any) => child.id === element.id)
    console.log('isScreen', matches)
    return matches.length === 1
  }
  return false
}

function save (msg: any) {
  const qElements = msg.elements
  /**
   * Is there somehow an get figma.getElemebntBy Id?
   */

  qElements.forEach((qElement: any, i: number) => {
    let fElement = figma.getNodeById(qElement.fId)
    if (fElement !== undefined) {
      quxKeys.forEach((key:any) => {
        if (qElement[key] || qElement[key] === '') {
          let newData = qElement[key]
          let oldData =  fElement.getPluginData(key)
          /**
           * On use api if we have a change. I suspect calling this method to often,
           * makes the UI slow...
           */
          if (newData != oldData) {
            console.log('code.save()', qElement.fId, key, qElement[key])
            fElement.setPluginData(key, qElement[key])
          }
        }
      })
    } else {
      console.log('code.save() > ids do not match', fElement, qElement)
    }
  });
}

function getStyles () {

  return {
    colors: getAllColors()
  }
}

function getAllColors () {
  let colors: any = {}

  figma.getLocalPaintStyles().forEach(s => {
    s.paints.forEach(p => {
      if (p.type === 'SOLID') {
        let solid = p as SolidPaint
        colorToString(colors, solid.color, solid, s.name)
      }
    })
  })

  getColorFromNode(colors, figma.root)

  let result = []
  for (let color in colors) {
    result.push({
      value: color,
      label: colors[color]
    })
  }
  result.push({
    value: '',
    label: 'Reset to none'
  })
  console.log('code.getAllColors() > exit ', result)
  return result
}

function getColorFromNode(colors: String[], node: any) {
  if (node) {
    // strokes and filles could also be symbols,
    // so watchout for the forEach
    if ('strokes' in node && node.strokes) {
      node.strokes.forEach((stroke: any) => {
        if (stroke && stroke.color) {
          colorToString(colors, stroke.color, node)
        }
      })
    }
    if ('fills' in node && node.fills.forEach) {
      node.fills.forEach((fill: any) => {
        if (fill && fill.type === 'SOLID') {
          colorToString(colors, fill.color, node)
        }
      })
    }
    if ('children' in node) {
      if (node.type !== 'INSTANCE') {
        /**
         * Go down recursive
         */
        for (const child of node.children) {
          getColorFromNode(colors, child)
        }
      }
    }
  }
}


function colorToString(colors: any, color: any, element: any = null, name: string = '') {
  let a = color.a ? color.a : 1
  if (element && element.opacity < 1) {
    a = element.opacity
  }
  let rbga = `rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, ${a})`

  if (!colors[rbga]) {
    if (name === '') {
      name = rgba2hex(color)
    }
    colors[rbga] = name
  }
}

function rgba2hex(c:any) {

  let hex =
    (Math.round(c.r * 255) | 1 << 8).toString(16).slice(1) +
    (Math.round(c.g * 255)  | 1 << 8).toString(16).slice(1) +
    (Math.round(c.b * 255)  | 1 << 8).toString(16).slice(1)

  return hex;
}
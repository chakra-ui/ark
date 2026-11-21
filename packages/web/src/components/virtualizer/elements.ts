import { adoptDisplay } from '../../utils/define.js'

import { GridVirtualizerElement } from './grid-virtualizer.js'
import { ListVirtualizerElement } from './list-virtualizer.js'
import { WindowVirtualizerElement } from './window-virtualizer.js'

class VirtualizerPartElement extends HTMLElement {
  connectedCallback() {
    adoptDisplay(this, 'block')
  }
}

const define = (tag: string, element: CustomElementConstructor) => {
  if (!customElements.get(tag)) customElements.define(tag, element)
}

define('ark-list-virtualizer', ListVirtualizerElement)
define('ark-list-virtualizer-content', class extends VirtualizerPartElement {})
define('ark-list-virtualizer-item', class extends VirtualizerPartElement {})

define('ark-window-virtualizer', WindowVirtualizerElement)
define('ark-window-virtualizer-content', class extends VirtualizerPartElement {})
define('ark-window-virtualizer-item', class extends VirtualizerPartElement {})

define('ark-grid-virtualizer', GridVirtualizerElement)
define('ark-grid-virtualizer-content', class extends VirtualizerPartElement {})
define('ark-grid-virtualizer-row', class extends VirtualizerPartElement {})
define('ark-grid-virtualizer-cell', class extends VirtualizerPartElement {})

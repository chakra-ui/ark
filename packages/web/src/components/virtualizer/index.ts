import './elements.js'

import type { GridVirtualizerElement } from './grid-virtualizer.js'
import type { ListVirtualizerElement } from './list-virtualizer.js'
import type { WindowVirtualizerElement } from './window-virtualizer.js'

export type {
  CSSProperties as VirtualizerCSSProperties,
  ScrollToIndexOptions,
  VirtualColumn,
  VirtualItem,
  VirtualRow,
} from '@zag-js/virtualizer'

export * from './create.js'
export { GridVirtualizerElement, type VirtualCell } from './grid-virtualizer.js'
export type { VirtualizerLifecycle } from './lifecycle.js'
export { ListVirtualizerElement } from './list-virtualizer.js'
export { renderVirtualItems, spreadVirtualizerProps, type VirtualizerProps } from './render.js'
export { WindowVirtualizerElement } from './window-virtualizer.js'

declare global {
  interface HTMLElementTagNameMap {
    'ark-grid-virtualizer': GridVirtualizerElement
    'ark-list-virtualizer': ListVirtualizerElement
    'ark-window-virtualizer': WindowVirtualizerElement
  }
}

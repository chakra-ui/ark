import type { JsonTreeViewElement, JsonTreeViewTreeElement } from './json-tree-view.js'

export { JsonTreeViewElement, JsonTreeViewTreeElement, type JsonTreeViewRenderValue } from './json-tree-view.js'
export type { JsonNode, JsonNodeHastElement, JsonNodePreviewOptions } from '@zag-js/json-tree-utils'
export type { TreeViewEventMap as JsonTreeViewEventMap } from '../tree-view/index.js'

declare global {
  interface HTMLElementTagNameMap {
    'ark-json-tree-view': JsonTreeViewElement
    'ark-json-tree-view-tree': JsonTreeViewTreeElement
  }
}

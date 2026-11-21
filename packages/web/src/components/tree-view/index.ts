import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/tree-view'
import type { RootElement } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'
import type { ItemInput } from '../../utils/collection.js'

export type { Api as TreeViewApi } from '@zag-js/tree-view'
export type TreeViewElement = RootElement<Api, Props> &
  FunctionProperties<Props> &
  Pick<Props, 'ids' | 'translations'> & { items?: ItemInput[] }

declare global {
  interface HTMLElementTagNameMap {
    'ark-tree-view': TreeViewElement
  }
}

export type TreeViewEventMap = CallbackEvents<Props>

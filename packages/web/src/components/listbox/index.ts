import type { Api, Props } from '@zag-js/listbox'

import type { CollectionItem, GridCollection, ListCollection } from '../collection/index.js'
import type { ActionMethods, RootElement, StateProperties } from '../../utils/define.js'
import type { CallbackEvents, FunctionProperties } from '../../utils/events.js'
import './root.js'
import './parts.js'

type PropTypes = Api extends Api<infer P> ? P : never

export type { Api as ListboxApi } from '@zag-js/listbox'
export {
  createGridCollection,
  createListCollection,
  type CollectionItem,
  type CollectionOptions,
  type GridCollection,
  type GridCollectionOptions,
  type ListCollection,
} from '../collection/index.js'

export interface ListboxElement<T extends CollectionItem = CollectionItem>
  extends
    ActionMethods<Api<PropTypes, T>, 'clearValue'>,
    RootElement<Api<PropTypes, T>, Props<T>>,
    FunctionProperties<Props<T>>,
    Pick<Props<T>, 'ids'>,
    StateProperties<Props<T>, 'value'> {
  /**
   * The items to choose from, e.g. from `createListCollection`. Assign a new collection to update the list.
   */
  collection?: ListCollection<T> | GridCollection<T> | undefined
}

declare global {
  interface HTMLElementTagNameMap {
    'ark-listbox': ListboxElement
  }
}

export type ListboxEventMap<T extends CollectionItem = CollectionItem> = CallbackEvents<Props<T>>

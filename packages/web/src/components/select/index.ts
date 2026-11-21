import type { Api, Props } from '@zag-js/select'

import type { CollectionItem, ListCollection } from '../collection/index.js'
import type { ActionMethods, RootElement, StateProperties } from '../../utils/define.js'
import type { CallbackEvents, FunctionProperties } from '../../utils/events.js'
import './root.js'
import './parts.js'

type PropTypes = Api extends Api<infer P> ? P : never

export type { Api as SelectApi } from '@zag-js/select'
export {
  createListCollection,
  type CollectionItem,
  type CollectionOptions,
  type ListCollection,
} from '../collection/index.js'

export interface SelectElement<T extends CollectionItem = CollectionItem>
  extends
    ActionMethods<Api<PropTypes, T>, 'clearValue'>,
    RootElement<Api<PropTypes, T>, Props<T>>,
    FunctionProperties<Props<T>>,
    Pick<Props<T>, 'ids' | 'translations' | 'positioning'>,
    StateProperties<Props<T>, 'open' | 'value'> {
  /**
   * The items to choose from, e.g. from `createListCollection`. Assign a new collection to update the list.
   */
  collection?: ListCollection<T> | undefined
}

declare global {
  interface HTMLElementTagNameMap {
    'ark-select': SelectElement
  }
}

export type SelectEventMap<T extends CollectionItem = CollectionItem> = CallbackEvents<Props<T>>

import type { Api, Props } from '@zag-js/combobox'

import type { CollectionItem, ListCollection } from '../collection/index.js'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type { CallbackEvents, FunctionProperties } from '../../utils/events.js'
import './root.js'
import './parts.js'

type PropTypes = Api extends Api<infer P> ? P : never

export type { Api as ComboboxApi } from '@zag-js/combobox'
export {
  createListCollection,
  type CollectionItem,
  type CollectionOptions,
  type ListCollection,
} from '../collection/index.js'

export type ComboboxElement<T extends CollectionItem = CollectionItem> = RootElement<Api<PropTypes, T>, Props<T>> &
  FunctionProperties<Props<T>> &
  Pick<Props<T>, 'ids' | 'translations' | 'positioning'> & {
    /**
     * The items to choose from, e.g. from `createListCollection`. Assign a new collection to update the list.
     */
    collection?: ListCollection<T> | undefined
  } & StateProperties<Props<T>, 'open' | 'value'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-combobox': ComboboxElement
  }
}

export type ComboboxEventMap<T extends CollectionItem = CollectionItem> = CallbackEvents<Props<T>>

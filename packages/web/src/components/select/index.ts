import type { Api, Props } from '@zag-js/select'

import type { CollectionItem, ListCollection } from '../collection/index.js'
import type { ActionMethods, RootElement, StateProperties } from '../../utils/define.js'
import type { CallbackEvents, FunctionProperties } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type {
  SelectLabel,
  SelectControl,
  SelectTrigger,
  SelectValueText,
  SelectIndicator,
  SelectClearTrigger,
  SelectPositioner,
  SelectContent,
  SelectList,
  SelectScrollArrow,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectHiddenInput,
} from './parts.js'

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
    'ark-select-label': InstanceType<typeof SelectLabel>
    'ark-select-control': InstanceType<typeof SelectControl>
    'ark-select-trigger': InstanceType<typeof SelectTrigger>
    'ark-select-value-text': InstanceType<typeof SelectValueText>
    'ark-select-indicator': InstanceType<typeof SelectIndicator>
    'ark-select-clear-trigger': InstanceType<typeof SelectClearTrigger>
    'ark-select-positioner': InstanceType<typeof SelectPositioner>
    'ark-select-content': InstanceType<typeof SelectContent>
    'ark-select-list': InstanceType<typeof SelectList>
    'ark-select-scroll-arrow': InstanceType<typeof SelectScrollArrow>
    'ark-select-item-group': InstanceType<typeof SelectItemGroup>
    'ark-select-item-group-label': InstanceType<typeof SelectItemGroupLabel>
    'ark-select-item': InstanceType<typeof SelectItem>
    'ark-select-item-text': InstanceType<typeof SelectItemText>
    'ark-select-item-indicator': InstanceType<typeof SelectItemIndicator>
    'ark-select-hidden-input': InstanceType<typeof SelectHiddenInput>
  }
}

export type SelectEventMap<T extends CollectionItem = CollectionItem> = CallbackEvents<Props<T>>

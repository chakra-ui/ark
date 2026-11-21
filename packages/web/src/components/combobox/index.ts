import type { Api, Props } from '@zag-js/combobox'

import type { CollectionItem, ListCollection } from '../collection/index.js'
import type { ActionMethods, RootElement, StateProperties } from '../../utils/define.js'
import type { CallbackEvents, FunctionProperties } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type {
  ComboboxLabel,
  ComboboxControl,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxClearTrigger,
  ComboboxPositioner,
  ComboboxContent,
  ComboboxList,
  ComboboxEmpty,
  ComboboxItemGroup,
  ComboboxItemGroupLabel,
  ComboboxItem,
  ComboboxItemText,
  ComboboxItemIndicator,
} from './parts.js'

type PropTypes = Api extends Api<infer P> ? P : never

export type { Api as ComboboxApi } from '@zag-js/combobox'
export {
  createListCollection,
  type CollectionItem,
  type CollectionOptions,
  type ListCollection,
} from '../collection/index.js'

export interface ComboboxElement<T extends CollectionItem = CollectionItem>
  extends
    ActionMethods<Api<PropTypes, T>, 'clearValue'>,
    RootElement<Api<PropTypes, T>, Props<T>>,
    FunctionProperties<Props<T>>,
    Pick<Props<T>, 'ids' | 'translations' | 'positioning'>,
    StateProperties<Props<T>, 'open' | 'value' | 'inputValue'> {
  /**
   * The items to choose from, e.g. from `createListCollection`. Assign a new collection to update the list.
   */
  collection?: ListCollection<T> | undefined
}

declare global {
  interface HTMLElementTagNameMap {
    'ark-combobox': ComboboxElement
    'ark-combobox-label': InstanceType<typeof ComboboxLabel>
    'ark-combobox-control': InstanceType<typeof ComboboxControl>
    'ark-combobox-input': InstanceType<typeof ComboboxInput>
    'ark-combobox-trigger': InstanceType<typeof ComboboxTrigger>
    'ark-combobox-clear-trigger': InstanceType<typeof ComboboxClearTrigger>
    'ark-combobox-positioner': InstanceType<typeof ComboboxPositioner>
    'ark-combobox-content': InstanceType<typeof ComboboxContent>
    'ark-combobox-list': InstanceType<typeof ComboboxList>
    'ark-combobox-empty': InstanceType<typeof ComboboxEmpty>
    'ark-combobox-item-group': InstanceType<typeof ComboboxItemGroup>
    'ark-combobox-item-group-label': InstanceType<typeof ComboboxItemGroupLabel>
    'ark-combobox-item': InstanceType<typeof ComboboxItem>
    'ark-combobox-item-text': InstanceType<typeof ComboboxItemText>
    'ark-combobox-item-indicator': InstanceType<typeof ComboboxItemIndicator>
  }
}

export type ComboboxEventMap<T extends CollectionItem = CollectionItem> = CallbackEvents<Props<T>>

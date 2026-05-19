import type { CollectionItem, SelectionMode } from '@zag-js/collection'
import type { Machine as ZagMachine } from '@zag-js/core'
import type { Machine } from '@zag-js/listbox'

export type {
  Api as ListboxApi,
  ElementIds as ListboxElementIds,
  HighlightChangeDetails as ListboxHighlightChangeDetails,
  InputProps as ListboxInputProps,
  ItemGroupLabelProps as ListboxItemGroupLabelProps,
  ItemGroupProps as ListboxItemGroupProps,
  ItemProps as ListboxItemProps,
  ItemState as ListboxItemState,
  Machine as ListboxMachine,
  Props as ListboxMachineProps,
  ScrollToIndexDetails as ListboxScrollToIndexDetails,
  SelectionDetails as ListboxSelectionDetails,
  Service as ListboxService,
  ValueChangeDetails as ListboxValueChangeDetails,
} from '@zag-js/listbox'

export type { SelectionMode as ListboxSelectionMode }

export type { CollectionItem }

export type ListboxSchema<T extends CollectionItem = CollectionItem> =
  Machine<T> extends ZagMachine<infer S> ? S : never

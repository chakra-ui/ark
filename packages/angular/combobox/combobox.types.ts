import type { CollectionItem } from '@zag-js/collection'
import type { Machine as ZagMachine } from '@zag-js/core'
import type { Machine } from '@zag-js/combobox'

export type {
  Api as ComboboxApi,
  Machine as ComboboxMachine,
  Props as ComboboxMachineProps,
  Service as ComboboxService,
  ElementIds as ComboboxElementIds,
  HighlightChangeDetails as ComboboxHighlightChangeDetails,
  InputValueChangeDetails as ComboboxInputValueChangeDetails,
  InputValueChangeReason as ComboboxInputValueChangeReason,
  IntlTranslations as ComboboxIntlTranslations,
  ItemGroupLabelProps as ComboboxItemGroupLabelProps,
  ItemGroupProps as ComboboxItemGroupProps,
  ItemProps as ComboboxItemProps,
  ItemState as ComboboxItemState,
  NavigateDetails as ComboboxNavigateDetails,
  OpenChangeDetails as ComboboxOpenChangeDetails,
  OpenChangeReason as ComboboxOpenChangeReason,
  PositioningOptions as ComboboxPositioningOptions,
  ScrollToIndexDetails as ComboboxScrollToIndexDetails,
  SelectionDetails as ComboboxSelectionDetails,
  TriggerProps as ComboboxTriggerProps,
  ValueChangeDetails as ComboboxValueChangeDetails,
} from '@zag-js/combobox'

export type { CollectionItem }

export type ComboboxSchema<T extends CollectionItem = CollectionItem> =
  Machine<T> extends ZagMachine<infer S> ? S : never

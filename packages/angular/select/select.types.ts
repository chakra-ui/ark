import type { CollectionItem } from '@zag-js/collection'
import type { Machine as ZagMachine } from '@zag-js/core'
import type { Machine } from '@zag-js/select'

export type {
  Api as SelectApi,
  ElementIds as SelectElementIds,
  FocusOutsideEvent as SelectFocusOutsideEvent,
  HighlightChangeDetails as SelectHighlightChangeDetails,
  InteractOutsideEvent as SelectInteractOutsideEvent,
  IntlTranslations as SelectIntlTranslations,
  ItemGroupLabelProps as SelectItemGroupLabelProps,
  ItemGroupProps as SelectItemGroupProps,
  ItemProps as SelectItemProps,
  ItemState as SelectItemState,
  Machine as SelectMachine,
  OpenChangeDetails as SelectOpenChangeDetails,
  PointerDownOutsideEvent as SelectPointerDownOutsideEvent,
  PositioningOptions as SelectPositioningOptions,
  Props as SelectMachineProps,
  ScrollToIndexDetails as SelectScrollToIndexDetails,
  SelectionDetails as SelectSelectionDetails,
  Service as SelectService,
  ValueChangeDetails as SelectValueChangeDetails,
} from '@zag-js/select'

export type { CollectionItem }

export type SelectSchema<T extends CollectionItem = CollectionItem> = Machine<T> extends ZagMachine<infer S> ? S : never

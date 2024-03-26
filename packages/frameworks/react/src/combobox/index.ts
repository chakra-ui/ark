import type {
  HighlightChangeDetails as ComboboxHighlightChangeDetails,
  InputValueChangeDetails as ComboboxInputValueChangeDetails,
  OpenChangeDetails as ComboboxOpenChangeDetails,
  ValueChangeDetails as ComboboxValueChangeDetails,
} from '@zag-js/combobox'
import type { CollectionItem } from '../types'
import { ComboboxClearTrigger, type ComboboxClearTriggerProps } from './combobox-clear-trigger'
import { ComboboxContent, type ComboboxContentProps } from './combobox-content'
import { ComboboxContext, type ComboboxContextProps } from './combobox-context'
import { ComboboxControl, type ComboboxControlProps } from './combobox-control'
import { ComboboxInput, type ComboboxInputProps } from './combobox-input'
import { ComboboxItem, type ComboboxItemProps } from './combobox-item'
import { ComboboxItemContext, type ComboboxItemContextProps } from './combobox-item-context'
import { ComboboxItemGroup, type ComboboxItemGroupProps } from './combobox-item-group'
import {
  ComboboxItemGroupLabel,
  type ComboboxItemGroupLabelProps,
} from './combobox-item-group-label'
import { ComboboxItemIndicator, type ComboboxItemIndicatorProps } from './combobox-item-indicator'
import { ComboboxItemText, type ComboboxItemTextProps } from './combobox-item-text'
import { ComboboxLabel, type ComboboxLabelProps } from './combobox-label'
import { ComboboxPositioner, type ComboboxPositionerProps } from './combobox-positioner'
import { ComboboxRoot, type ComboboxRootProps } from './combobox-root'
import { ComboboxTrigger, type ComboboxTriggerProps } from './combobox-trigger'
import { useComboboxContext, type UseComboboxContext } from './use-combobox-context'
import { useComboboxItemContext, type UseComboboxItemContext } from './use-combobox-item-context'

export * as Combobox from './combobox'

export {
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxContext,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemContext,
  ComboboxItemGroup,
  ComboboxItemGroupLabel,
  ComboboxItemIndicator,
  ComboboxItemText,
  ComboboxLabel,
  ComboboxPositioner,
  ComboboxRoot,
  ComboboxTrigger,
  useComboboxContext,
  useComboboxItemContext,
}
export type {
  CollectionItem,
  ComboboxClearTriggerProps,
  ComboboxContentProps,
  ComboboxContextProps,
  ComboboxControlProps,
  ComboboxHighlightChangeDetails,
  ComboboxInputProps,
  ComboboxInputValueChangeDetails,
  ComboboxItemContextProps,
  ComboboxItemGroupLabelProps,
  ComboboxItemGroupProps,
  ComboboxItemIndicatorProps,
  ComboboxItemProps,
  ComboboxItemTextProps,
  ComboboxLabelProps,
  ComboboxOpenChangeDetails,
  ComboboxPositionerProps,
  ComboboxRootProps,
  ComboboxTriggerProps,
  ComboboxValueChangeDetails,
  UseComboboxContext,
  UseComboboxItemContext,
}

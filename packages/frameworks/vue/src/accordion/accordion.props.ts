import type { Context, FocusChangeDetails, ValueChangeDetails } from '@zag-js/accordion'
import type { PropType } from 'vue'
import { declareEmits } from '../utils'

import type { PresenceEmits, PresenceProps } from '../presence/presence.props'
import type { BaseProps } from '../types'
import type { UseAccordionProps } from './use-accordion'

export interface AccordionRootProps extends BaseProps, UseAccordionProps, PresenceProps {}

export const props = {
  collapsible: {
    type: Boolean as PropType<Context['collapsible']>,
    default: false,
  },
  dir: {
    type: String as PropType<Context['dir']>,
  },
  disabled: {
    type: Boolean as PropType<Context['disabled']>,
    default: undefined,
  },
  getRootNode: {
    type: Function as PropType<Context['getRootNode']>,
  },
  id: {
    type: String as PropType<Context['id']>,
  },
  ids: {
    type: Object as PropType<Context['ids']>,
  },
  multiple: {
    type: Boolean as PropType<Context['multiple']>,
    default: false,
  },
  orientation: {
    type: String as PropType<Context['orientation']>,
  },
  modelValue: {
    type: Array as PropType<Context['value']>,
  },
}
export const emits = declareEmits(['focus-change', 'value-change', 'update:modelValue'])

export type AccordionRootEmits = {
  /**
   * The callback fired when the focused accordion item changes.
   */
  focusChange: [details: FocusChangeDetails]
  /**
   * The callback fired when the state of opened/closed accordion items changes.
   */
  valueChange: [value: ValueChangeDetails]
} & PresenceEmits

/**
 * The `id` of the accordion item that is currently being opened.
 */
export type AccordionRootModelValue = Context['value']

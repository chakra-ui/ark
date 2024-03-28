import type { Context } from '@zag-js/date-picker'
import type { PropType } from 'vue'
import { declareEmits } from '../utils'

export const props = {
  closeOnSelect: {
    type: Boolean as PropType<Context['closeOnSelect']>,
    default: true,
  },
  dir: {
    type: String as PropType<Context['dir']>,
  },
  disabled: {
    type: Boolean as PropType<Context['disabled']>,
    default: undefined,
  },
  fixedWeeks: {
    type: Boolean as PropType<Context['fixedWeeks']>,
  },
  focusedValue: {
    type: String as PropType<string>,
  },
  format: {
    type: Function as PropType<Context['format']>,
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
  isDateUnavailable: {
    type: Function as PropType<Context['isDateUnavailable']>,
  },
  locale: {
    type: String as PropType<Context['locale']>,
  },
  max: {
    type: String as PropType<string>,
  },
  min: {
    type: String as PropType<string>,
  },
  modal: {
    type: Boolean as PropType<Context['modal']>,
  },
  modelValue: {
    type: Array as PropType<string[]>,
  },
  name: {
    type: String as PropType<Context['name']>,
  },
  numOfMonths: {
    type: Number as PropType<Context['numOfMonths']>,
  },
  open: {
    type: Boolean as PropType<Context['open']>,
    default: undefined,
  },
  positioning: {
    type: Object as PropType<Context['positioning']>,
  },
  readOnly: {
    type: Boolean as PropType<Context['readOnly']>,
  },
  selectionMode: {
    type: String as PropType<Context['selectionMode']>,
  },
  startOfWeek: {
    type: Number as PropType<Context['startOfWeek']>,
  },
  timeZone: {
    type: String as PropType<Context['timeZone']>,
  },
  translations: {
    type: Object as PropType<Context['translations']>,
  },
  view: {
    type: String as PropType<Context['view']>,
  },
}
export const emits = declareEmits([
  'focus-change',
  'open-change',
  'value-change',
  'view-change',
  'update:modelValue',
])

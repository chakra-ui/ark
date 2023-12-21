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
    type: Object as PropType<Context['focusedValue']>,
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
  locale: {
    type: String as PropType<Context['locale']>,
  },
  max: {
    type: Object as PropType<Context['max']>,
  },
  min: {
    type: Object as PropType<Context['min']>,
  },
  modal: {
    type: Boolean as PropType<Context['modal']>,
  },
  modelValue: {
    type: Array as PropType<Context['value']>,
  },
  name: {
    type: String as PropType<Context['name']>,
  },
  numOfMonths: {
    type: Number as PropType<Context['numOfMonths']>,
  },
  open: {
    type: Boolean as PropType<Context['open']>,
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
  view: {
    type: String as PropType<Context['view']>,
    default: 'day',
  },
}
export const emits = declareEmits([
  'focus-change',
  'value-change',
  'view-change',
  'open-change',
  'update:modelValue',
])

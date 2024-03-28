import type { PresetTriggerProps } from '@zag-js/date-picker'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerPresetTriggerProps
  extends Assign<HTMLArkProps<'button'>, PresetTriggerProps> {}

export const DatePickerPresetTrigger = defineComponent<DatePickerPresetTriggerProps>(
  (props, { attrs, slots }) => {
    const api = useDatePickerContext()

    return () => (
      <ark.button {...api.value.getPresetTriggerProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'DatePickerPresetTrigger',
    props: {
      value: {
        type: String as PropType<PresetTriggerProps['value']>,
      },
    },
  },
)

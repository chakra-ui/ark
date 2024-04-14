import type { PresetTriggerProps } from '@zag-js/date-picker'
import { type PropType, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
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

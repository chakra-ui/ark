import type { DateValue } from '@zag-js/date-picker'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'

// TODO: remove after zag is updated
type DateRangePreset =
  | 'thisWeek'
  | 'lastWeek'
  | 'thisMonth'
  | 'lastMonth'
  | 'thisQuarter'
  | 'lastQuarter'
  | 'thisYear'
  | 'lastYear'
  | 'last3Days'
  | 'last7Days'
  | 'last14Days'
  | 'last30Days'
  | 'last90Days'

interface PresetTriggerProps {
  value: DateValue[] | DateRangePreset
}

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
        type: Object as PropType<PresetTriggerProps['value']>,
      },
    },
  },
)

import type { DateValue } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
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

export const DatePickerPresetTrigger: ArkComponent<'button', PresetTriggerProps> = (
  props: DatePickerPresetTriggerProps,
) => {
  const [presetTriggerProps, localProps] = createSplitProps<PresetTriggerProps>()(props, ['value'])
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().getPresetTriggerProps(presetTriggerProps), localProps)

  return <ark.button {...mergedProps} />
}

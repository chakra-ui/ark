import type { PresetTriggerProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerPresetTriggerProps
  extends Assign<HTMLArkProps<'button'>, PresetTriggerProps> {}

export const DatePickerPresetTrigger = (props: DatePickerPresetTriggerProps) => {
  const [presetTriggerProps, localProps] = createSplitProps<PresetTriggerProps>()(props, ['value'])
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().getPresetTriggerProps(presetTriggerProps), localProps)

  return <ark.button {...mergedProps} />
}

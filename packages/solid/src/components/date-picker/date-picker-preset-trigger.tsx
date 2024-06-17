import type { PresetTriggerProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerPresetTriggerBaseProps
  extends PresetTriggerProps,
    PolymorphicProps<'button'> {}
export interface DatePickerPresetTriggerProps
  extends Assign<HTMLProps<'button'>, DatePickerPresetTriggerBaseProps> {}

export const DatePickerPresetTrigger = (props: DatePickerPresetTriggerProps) => {
  const [presetTriggerProps, localProps] = createSplitProps<PresetTriggerProps>()(props, ['value'])
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().getPresetTriggerProps(presetTriggerProps), localProps)

  return <ark.button {...mergedProps} />
}

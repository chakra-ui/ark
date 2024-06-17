import type { PresetTriggerProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerPresetTriggerBaseProps extends PresetTriggerProps, PolymorphicProps {}
export interface DatePickerPresetTriggerProps
  extends Assign<ButtonHTMLAttributes<HTMLButtonElement>, DatePickerPresetTriggerBaseProps> {}

export const DatePickerPresetTrigger = forwardRef<HTMLButtonElement, DatePickerPresetTriggerProps>(
  (props, ref) => {
    const [presetTriggerProps, localProps] = createSplitProps<PresetTriggerProps>()(props, [
      'value',
    ])
    const datePicker = useDatePickerContext()
    const mergedProps = mergeProps(datePicker.getPresetTriggerProps(presetTriggerProps), localProps)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

DatePickerPresetTrigger.displayName = 'DatePickerPresetTrigger'

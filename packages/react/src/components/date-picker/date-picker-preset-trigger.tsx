import type { PresetTriggerProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerPresetTriggerBaseProps extends PresetTriggerProps {}
export interface DatePickerPresetTriggerProps
  extends Assign<HTMLArkProps<'button'>, DatePickerPresetTriggerBaseProps> {}

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

import type { PresetTriggerProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerPresetTriggerProps
  extends Assign<HTMLArkProps<'button'>, PresetTriggerProps> {}

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

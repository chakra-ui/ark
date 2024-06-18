import { mergeProps } from '@zag-js/react'
import type { PeriodCellProps } from '@zag-js/time-picker'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerPeriodCellBaseProps extends PeriodCellProps {}
export interface TimePickerPeriodCellProps
  extends Assign<HTMLProps<'button'>, TimePickerPeriodCellBaseProps> {}

export const TimePickerPeriodCell = forwardRef<HTMLButtonElement, TimePickerPeriodCellProps>(
  (props, ref) => {
    const [cellProps, localProps] = createSplitProps<PeriodCellProps>()(props, ['value'])
    const timePicker = useTimePickerContext()
    const mergedProps = mergeProps(timePicker.getPeriodCellProps(cellProps), localProps)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

TimePickerPeriodCell.displayName = 'TimePickerPeriodCell'

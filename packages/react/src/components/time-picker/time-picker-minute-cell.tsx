import { mergeProps } from '@zag-js/react'
import type { CellProps } from '@zag-js/time-picker'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerMinuteCellBaseProps extends CellProps {}
export interface TimePickerMinuteCellProps
  extends Assign<HTMLArkProps<'div'>, TimePickerMinuteCellBaseProps> {}

export const TimePickerMinuteCell = forwardRef<HTMLDivElement, TimePickerMinuteCellProps>(
  (props, ref) => {
    const [cellProps, localProps] = createSplitProps<CellProps>()(props, ['value'])
    const timePicker = useTimePickerContext()
    const mergedProps = mergeProps(timePicker.getMinuteCellProps(cellProps), localProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TimePickerMinuteCell.displayName = 'TimePickerMinuteCell'

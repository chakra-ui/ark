import { mergeProps } from '@zag-js/react'
import type { CellProps } from '@zag-js/time-picker'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerHourCellBaseProps extends CellProps {}
export interface TimePickerHourCellProps
  extends Assign<HTMLArkProps<'div'>, TimePickerHourCellBaseProps> {}

export const TimePickerHourCell = forwardRef<HTMLDivElement, TimePickerHourCellProps>(
  (props, ref) => {
    const [cellProps, localProps] = createSplitProps<CellProps>()(props, ['value'])
    const timePicker = useTimePickerContext()
    const mergedProps = mergeProps(timePicker.getHourCellProps(cellProps), localProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TimePickerHourCell.displayName = 'TimePickerHourCell'

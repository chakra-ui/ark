import { mergeProps } from '@zag-js/react'
import type { CellProps } from '@zag-js/time-picker'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerHourCellBaseProps extends CellProps, PolymorphicProps {}
export interface TimePickerHourCellProps
  extends Assign<HTMLProps<'button'>, TimePickerHourCellBaseProps> {}

export const TimePickerHourCell = forwardRef<HTMLButtonElement, TimePickerHourCellProps>(
  (props, ref) => {
    const [cellProps, localProps] = createSplitProps<CellProps>()(props, ['value'])
    const timePicker = useTimePickerContext()
    const mergedProps = mergeProps(timePicker.getHourCellProps(cellProps), localProps)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

TimePickerHourCell.displayName = 'TimePickerHourCell'

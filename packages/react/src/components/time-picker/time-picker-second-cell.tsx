import { mergeProps } from '@zag-js/react'
import type { CellProps } from '@zag-js/time-picker'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerSecondCellBaseProps extends CellProps {}
export interface TimePickerSecondCellProps
  extends Assign<HTMLArkProps<'div'>, TimePickerSecondCellBaseProps> {}

export const TimePickerSecondCell = forwardRef<HTMLDivElement, TimePickerSecondCellProps>(
  (props, ref) => {
    const [cellProps, localProps] = createSplitProps<CellProps>()(props, ['value'])
    const timePicker = useTimePickerContext()
    const mergedProps = mergeProps(timePicker.getSecondCellProps(cellProps), localProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TimePickerSecondCell.displayName = 'TimePickerSecondCell'

import { mergeProps } from '@zag-js/react'
import type { CellProps } from '@zag-js/time-picker'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerMinuteCellBaseProps extends CellProps, PolymorphicProps {}
export interface TimePickerMinuteCellProps
  extends Assign<HTMLProps<'button'>, TimePickerMinuteCellBaseProps> {}

export const TimePickerMinuteCell = forwardRef<HTMLButtonElement, TimePickerMinuteCellProps>(
  (props, ref) => {
    const [cellProps, localProps] = createSplitProps<CellProps>()(props, ['value'])
    const timePicker = useTimePickerContext()
    const mergedProps = mergeProps(timePicker.getMinuteCellProps(cellProps), localProps)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

TimePickerMinuteCell.displayName = 'TimePickerMinuteCell'

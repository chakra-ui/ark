import { mergeProps } from '@zag-js/solid'
import type { PeriodCellProps } from '@zag-js/time-picker'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerPeriodCellBaseProps
  extends PeriodCellProps,
    PolymorphicProps<'button'> {}
export interface TimePickerPeriodCellProps
  extends Assign<HTMLProps<'button'>, TimePickerPeriodCellBaseProps> {}

export const TimePickerPeriodCell = (props: TimePickerPeriodCellProps) => {
  const [cellProps, localProps] = createSplitProps<PeriodCellProps>()(props, ['value'])
  const timePicker = useTimePickerContext()
  const mergedProps = mergeProps(() => timePicker().getPeriodCellProps(cellProps), localProps)

  return <ark.button {...mergedProps} />
}

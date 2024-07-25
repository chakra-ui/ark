import { mergeProps } from '@zag-js/solid'
import type { CellProps, PeriodCellProps, TimePeriod } from '@zag-js/time-picker'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimePickerColumnPropsContext } from './use-time-picker-column-props-context'
import { useTimePickerContext } from './use-time-picker-context'

interface CombinedCellProps {
  value: number | TimePeriod
}

export interface TimePickerCellBaseProps extends CombinedCellProps, PolymorphicProps<'button'> {}
export interface TimePickerCellProps extends Assign<HTMLProps<'button'>, TimePickerCellBaseProps> {}

export const TimePickerCell = (props: TimePickerCellProps) => {
  const [cellProps, localProps] = createSplitProps<CombinedCellProps>()(props, ['value'])
  const timePicker = useTimePickerContext()
  const columnProps = useTimePickerColumnPropsContext()

  const unitToPropsMap = {
    hour: () => timePicker().getHourCellProps(cellProps as CellProps),
    minute: () => timePicker().getMinuteCellProps(cellProps as CellProps),
    second: () => timePicker().getSecondCellProps(cellProps as CellProps),
    period: () => timePicker().getPeriodCellProps(cellProps as PeriodCellProps),
  }

  const mergedProps = mergeProps(() => unitToPropsMap[columnProps.unit](), localProps)

  return <ark.button {...mergedProps} />
}

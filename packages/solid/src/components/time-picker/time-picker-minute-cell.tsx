import { mergeProps } from '@zag-js/solid'
import type { CellProps } from '@zag-js/time-picker'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerMinuteCellBaseProps extends CellProps, PolymorphicProps<'button'> {}
export interface TimePickerMinuteCellProps
  extends Assign<HTMLProps<'button'>, TimePickerMinuteCellBaseProps> {}

export const TimePickerMinuteCell = (props: TimePickerMinuteCellProps) => {
  const [cellProps, localProps] = createSplitProps<CellProps>()(props, ['value'])
  const timePicker = useTimePickerContext()
  const mergedProps = mergeProps(() => timePicker().getMinuteCellProps(cellProps), localProps)

  return <ark.button {...mergedProps} />
}

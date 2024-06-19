import { mergeProps } from '@zag-js/solid'
import type { ColumnProps } from '@zag-js/time-picker'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerColumnBaseProps extends ColumnProps, PolymorphicProps<'div'> {}
export interface TimePickerColumnProps
  extends Assign<HTMLProps<'div'>, TimePickerColumnBaseProps> {}

export const TimePickerColumn = (props: TimePickerColumnProps) => {
  const [columnProps, localProps] = createSplitProps<ColumnProps>()(props, ['unit'])
  const timePicker = useTimePickerContext()
  const mergedProps = mergeProps(() => timePicker().getColumnProps(columnProps), localProps)

  return <ark.div {...mergedProps} />
}

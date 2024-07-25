import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerControlBaseProps extends PolymorphicProps<'div'> {}
export interface TimePickerControlProps
  extends Assign<HTMLProps<'div'>, TimePickerControlBaseProps> {}

export const TimePickerControl = (props: TimePickerControlProps) => {
  const timePicker = useTimePickerContext()
  const mergedProps = mergeProps(() => timePicker().getControlProps(), props)

  return <ark.div {...mergedProps} />
}

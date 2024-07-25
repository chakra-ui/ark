import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerLabelBaseProps extends PolymorphicProps<'label'> {}
export interface TimePickerLabelProps
  extends Assign<HTMLProps<'label'>, TimePickerLabelBaseProps> {}

export const TimePickerLabel = (props: TimePickerLabelProps) => {
  const timePicker = useTimePickerContext()
  const mergedProps = mergeProps(() => timePicker().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}

import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerSpacerBaseProps extends PolymorphicProps<'div'> {}
export interface TimePickerSpacerProps
  extends Assign<HTMLProps<'div'>, TimePickerSpacerBaseProps> {}

export const TimePickerSpacer = (props: TimePickerSpacerProps) => {
  const timePicker = useTimePickerContext()
  const mergedProps = mergeProps(() => timePicker().getSpacerProps(), props)

  return <ark.div {...mergedProps} />
}

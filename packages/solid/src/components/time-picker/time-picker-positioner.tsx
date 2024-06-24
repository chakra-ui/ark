import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerPositionerBaseProps extends PolymorphicProps<'div'> {}
export interface TimePickerPositionerProps
  extends HTMLProps<'div'>,
    TimePickerPositionerBaseProps {}

export const TimePickerPositioner = (props: TimePickerPositionerProps) => {
  const timePicker = useTimePickerContext()
  const mergedProps = mergeProps(() => timePicker().getPositionerProps(), props)
  const presenceApi = usePresenceContext()

  return (
    <Show when={!presenceApi().unmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}

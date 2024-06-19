import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import type { Assign } from '../../types'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerContentBaseProps extends PolymorphicProps<'div'> {}
export interface TimePickerContentProps
  extends Assign<HTMLProps<'div'>, TimePickerContentBaseProps> {}

export const TimePickerContent = (props: TimePickerContentProps) => {
  const timePicker = useTimePickerContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(
    () => timePicker().getContentProps(),
    () => presenceApi().presenceProps,
    props,
  )

  return (
    <Show when={!presenceApi().unmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}

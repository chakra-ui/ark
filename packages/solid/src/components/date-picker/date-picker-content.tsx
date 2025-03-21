import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { composeRefs } from '../../utils/compose-refs'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerContentBaseProps extends PolymorphicProps<'div'> {}
export interface DatePickerContentProps extends HTMLProps<'div'>, DatePickerContentBaseProps {}

export const DatePickerContent = (props: DatePickerContentProps) => {
  const api = useDatePickerContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(
    () => api().getContentProps(),
    () => presenceApi().presenceProps,
    props,
  )

  return (
    <Show when={!presenceApi().unmounted}>
      <ark.div {...mergedProps} ref={composeRefs(presenceApi().ref, props.ref)} />
    </Show>
  )
}

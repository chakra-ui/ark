import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerPositionerProps extends HTMLArkProps<'div'> {}

export const DatePickerPositioner = (props: DatePickerPositionerProps) => {
  const api = useDatePickerContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(() => api().getPositionerProps(), props)

  return (
    <Show when={!presenceApi().unmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}

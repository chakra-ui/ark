import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerPositionerProps extends HTMLArkProps<'div'> {}

export const DatePickerPositioner = (props: DatePickerPositionerProps) => {
  const api = useDatePickerContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(() => api().positionerProps, props)

  return (
    <Show when={!presenceApi().isUnmounted}>
      <ark.div {...mergedProps()} />
    </Show>
  )
}

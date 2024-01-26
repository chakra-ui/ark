import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerPositionerProps extends HTMLArkProps<'div'> {}

export const DatePickerPositioner: ArkComponent<'div'> = (props: DatePickerPositionerProps) => {
  const api = useDatePickerContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(() => api().positionerProps, props)

  return (
    <Show when={!presenceApi().isUnmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}

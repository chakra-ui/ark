import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useSelectContext } from './use-select-context'

export interface SelectPositionerProps extends HTMLArkProps<'div'> {}

export const SelectPositioner = (props: SelectPositionerProps) => {
  const api = useSelectContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(() => api().positionerProps, props)

  return (
    <Show when={!presenceApi().isUnmounted}>
      <ark.div {...mergedProps()} />
    </Show>
  )
}

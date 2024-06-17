import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useHoverCardContext } from './use-hover-card-context'

export interface HoverCardPositionerBaseProps extends PolymorphicProps<'div'> {}
export interface HoverCardPositionerProps extends HTMLProps<'div'>, HoverCardPositionerBaseProps {}

export const HoverCardPositioner = (props: HoverCardPositionerProps) => {
  const api = useHoverCardContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(() => api().getPositionerProps(), props)

  return (
    <Show when={!presenceApi().unmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}

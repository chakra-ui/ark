import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { Show } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useHoverCardContext } from './use-hover-card-context'

export interface HoverCardContentBaseProps extends PolymorphicProps<'div'> {}
export interface HoverCardContentProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    HoverCardContentBaseProps {}

export const HoverCardContent = (props: HoverCardContentProps) => {
  const api = useHoverCardContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(
    () => api().getContentProps(),
    () => presenceApi().presenceProps,
    props,
  )

  return (
    <Show when={!presenceApi().unmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}

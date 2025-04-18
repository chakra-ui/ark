import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { composeRefs } from '../../utils/compose-refs'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { splitPresenceProps } from './split-presence-props'
import { type UsePresenceProps, usePresence } from './use-presence'

export interface PresenceBaseProps extends UsePresenceProps, PolymorphicProps<'div'> {}
export interface PresenceProps extends HTMLProps<'div'>, PresenceBaseProps {}

export const Presence = (props: PresenceProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = usePresence(presenceProps)
  const mergedProps = mergeProps(() => api().presenceProps, localProps)

  return (
    <Show when={!api().unmounted}>
      <ark.div {...mergedProps} ref={composeRefs(api().ref, props.ref)} data-scope="presence" data-part="root" />
    </Show>
  )
}

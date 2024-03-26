import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { splitPresenceProps } from './split-presence-props'
import { usePresence, type UsePresenceProps } from './use-presence'

export interface PresenceProps extends Assign<HTMLArkProps<'div'>, UsePresenceProps> {}

export const Presence = (props: PresenceProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = usePresence(presenceProps)
  const mergedProps = mergeProps(() => api().presenceProps, localProps)

  return (
    <Show when={!api().isUnmounted}>
      <ark.div {...mergedProps} data-scope="presence" data-part="root" />
    </Show>
  )
}

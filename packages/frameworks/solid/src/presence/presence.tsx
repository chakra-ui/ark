import { children, createEffect, createSignal, type JSXElement } from 'solid-js'
import { spread } from 'solid-js/web'
import { createSplitProps } from '../create-split-props'
import { usePresence, type UsePresenceProps } from './use-presence'

export interface PresenceProps extends UsePresenceProps {
  /**
   * Whether to enable lazy mounting. Defaults to `false`.
   */
  lazyMount?: boolean
  /**
   * Whether to unmount on exit. Defaults to `false`.
   */
  unmountOnExit?: boolean
  /**
   * The children to render.
   */
  children?: JSXElement
  /**
   * A fallback to render the component is not present.
   */
  fallback?: JSXElement
}

export const Presence = (props: PresenceProps) => {
  const [presenceProps, localProps] = createSplitProps<UsePresenceProps>()(props, [
    'onExitComplete',
    'present',
  ])
  const api = usePresence(presenceProps)
  const [wasEverPresent, setWasEverPresent] = createSignal(false)

  const getChildren = children(() => props.children)

  createEffect(() => {
    const isPresent = api().isPresent
    if (isPresent) setWasEverPresent(true)

    const children = getChildren()
    if (children instanceof HTMLElement) {
      api().setNode(children)
      spread(children, {
        ['data-state']: presenceProps.present ? 'open' : 'closed',
        hidden: !api().isPresent,
      })
    }
  })

  return (
    <>
      {(!api().isPresent && !wasEverPresent() && localProps.lazyMount) ||
      (localProps.unmountOnExit && !api().isPresent && wasEverPresent())
        ? localProps.fallback
        : getChildren()}
    </>
  )
}

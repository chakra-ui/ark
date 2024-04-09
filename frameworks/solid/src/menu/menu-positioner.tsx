import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useMenuContext } from './use-menu-context'

export interface MenuPositionerProps extends HTMLArkProps<'div'> {}

export const MenuPositioner = (props: MenuPositionerProps) => {
  const context = useMenuContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(() => context().positionerProps, props)

  return (
    <Show when={!presence().isUnmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}

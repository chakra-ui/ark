import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLArkProps, ark } from '../../factory'
import { usePresenceContext } from '../presence'
import { useMenuContext } from './use-menu-context'

export interface MenuContentProps extends HTMLArkProps<'div'> {}

export const MenuContent = (props: MenuContentProps) => {
  const context = useMenuContext()
  const presenceContext = usePresenceContext()
  const mergedProps = mergeProps(
    () => context().contentProps,
    () => presenceContext().presenceProps,
    props,
  )

  return (
    <Show when={!presenceContext().isUnmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}

import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useMenuContext } from './use-menu-context'

export interface MenuPositionerBaseProps extends PolymorphicProps<'div'> {}
export interface MenuPositionerProps extends HTMLProps<'div'>, MenuPositionerBaseProps {}

export const MenuPositioner = (props: MenuPositionerProps) => {
  const context = useMenuContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(() => context().getPositionerProps(), props)

  return (
    <Show when={!presence().unmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}

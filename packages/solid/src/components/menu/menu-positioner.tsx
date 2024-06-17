import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { Show } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useMenuContext } from './use-menu-context'

export interface MenuPositionerBaseProps extends PolymorphicProps<'div'> {}
export interface MenuPositionerProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    MenuPositionerBaseProps {}

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

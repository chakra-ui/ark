import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { usePresenceContext } from '../presence/index.tsx'
import { useMenuContext } from './use-menu-context.ts'

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

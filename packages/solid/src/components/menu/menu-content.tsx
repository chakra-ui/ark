import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useMenuContext } from './use-menu-context'

export interface MenuContentBaseProps extends PolymorphicProps<'div'> {}
export interface MenuContentProps extends HTMLProps<'div'>, MenuContentBaseProps {}

export const MenuContent = (props: MenuContentProps) => {
  const context = useMenuContext()
  const presenceContext = usePresenceContext()
  const mergedProps = mergeProps(
    () => context().getContentProps(),
    () => presenceContext().presenceProps,
    props,
  )

  return (
    <Show when={!presenceContext().unmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}

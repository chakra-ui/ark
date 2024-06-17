import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { Show } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useMenuContext } from './use-menu-context'

export interface MenuContentBaseProps extends PolymorphicProps<'div'> {}
export interface MenuContentProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    MenuContentBaseProps {}

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

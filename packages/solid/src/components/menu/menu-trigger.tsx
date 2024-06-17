import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useMenuContext } from './use-menu-context'

export interface MenuTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface MenuTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    MenuTriggerBaseProps {}

export const MenuTrigger = (props: MenuTriggerProps) => {
  const api = useMenuContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(
    () => api().getTriggerProps(),
    () => ({ 'aria-controls': presenceApi().unmounted && null }),
    props,
  )
  return <ark.button {...mergedProps} />
}

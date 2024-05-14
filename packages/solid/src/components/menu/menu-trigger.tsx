import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useMenuContext } from './use-menu-context'

export interface MenuTriggerProps extends HTMLArkProps<'button'> {}

export const MenuTrigger = (props: MenuTriggerProps) => {
  const api = useMenuContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(
    () => api().triggerProps,
    () => ({ 'aria-controls': presenceApi().unmounted && null }),
    props,
  )
  return <ark.button {...mergedProps} />
}

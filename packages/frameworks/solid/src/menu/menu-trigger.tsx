import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useMenuContext } from './menu-context'

export interface MenuTriggerProps extends HTMLArkProps<'button'> {}

export const MenuTrigger: ArkComponent<'button'> = (props: MenuTriggerProps) => {
  const api = useMenuContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(
    () => api().triggerProps,
    () => ({ 'aria-controls': presenceApi().isUnmounted && null }),
    props,
  )

  return <ark.button {...mergedProps} />
}

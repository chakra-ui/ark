import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

export interface MenuTriggerProps extends HTMLArkProps<'button'> {}

export const MenuTrigger = (props: MenuTriggerProps) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(() => menu?.().triggerProps, props)

  return <ark.button {...mergedProps} />
}

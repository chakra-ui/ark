import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

export type MenuTriggerProps = HTMLArkProps<'button'>

export const MenuTrigger = (props: MenuTriggerProps) => {
  const menu = useMenuContext()
  const triggerProps = mergeProps(() => menu?.().triggerProps, props)
  return <ark.button {...triggerProps} />
}

import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

export type MenuContextTriggerProps = HTMLArkProps<'button'>

export const MenuContextTrigger = (props: MenuContextTriggerProps) => {
  const menu = useMenuContext()
  const triggerProps = mergeProps(() => menu?.().contextTriggerProps, props)
  return <ark.button {...triggerProps} />
}

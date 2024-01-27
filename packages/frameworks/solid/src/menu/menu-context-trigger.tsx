import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

export interface MenuContextTriggerProps extends HTMLArkProps<'button'> {}

export const MenuContextTrigger: ArkComponent<'button'> = (props: MenuContextTriggerProps) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(() => menu?.().contextTriggerProps, props)

  return <ark.button {...mergedProps} />
}

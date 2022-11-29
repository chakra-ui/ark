import { ark, HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'
import type { UseMenuReturn } from './use-menu'

export type MenuContentProps = HTMLArkProps<'div'>

export const MenuContent = (props: MenuContentProps) => {
  const api = useMenuContext() as () => ReturnType<UseMenuReturn>['api']

  return <ark.div {...api?.()?.contentProps} {...props} />
}

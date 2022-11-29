import { ark, HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'
import type { UseMenuReturn } from './use-menu'

export type MenuPositionerProps = HTMLArkProps<'div'>

export const MenuPositioner = (props: MenuPositionerProps) => {
  const api = useMenuContext() as () => ReturnType<UseMenuReturn>['api']
  return <ark.div {...api?.().positionerProps} {...props} />
}

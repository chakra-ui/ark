import { ark, HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'
import type { UseMenuReturn } from './use-menu'

export type MenuSeparatorProps = HTMLArkProps<'hr'>

export const MenuSeparator = (props: MenuSeparatorProps) => {
  const api = useMenuContext() as () => ReturnType<UseMenuReturn>['api']

  return <ark.hr {...api?.().separatorProps} {...props} />
}

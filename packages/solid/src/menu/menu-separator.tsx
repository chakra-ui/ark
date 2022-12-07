import { ark, HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

export type MenuSeparatorProps = HTMLArkProps<'hr'>

export const MenuSeparator = (props: MenuSeparatorProps) => {
  const menu = useMenuContext()

  return <ark.hr {...menu?.().separatorProps} {...props} />
}

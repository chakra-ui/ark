import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

export type MenuSeparatorProps = HTMLArkProps<'hr'>

export const MenuSeparator = (props: MenuSeparatorProps) => {
  const menu = useMenuContext()
  const separatorProps = mergeProps(() => menu?.().separatorProps, props)
  return <ark.hr {...separatorProps} />
}

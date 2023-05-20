import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

export type MenuContentProps = HTMLArkProps<'div'>

export const MenuContent = (props: MenuContentProps) => {
  const menu = useMenuContext()
  const contentProps = mergeProps(() => menu?.().contentProps, props)
  return <ark.div {...contentProps} />
}

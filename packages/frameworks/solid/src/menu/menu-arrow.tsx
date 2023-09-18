import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

export type MenuArrowProps = HTMLArkProps<'div'>

export const MenuArrow = (props: MenuArrowProps) => {
  const menu = useMenuContext()
  const arrowProps = mergeProps(() => menu?.().arrowProps, props)
  return <ark.div {...arrowProps} />
}

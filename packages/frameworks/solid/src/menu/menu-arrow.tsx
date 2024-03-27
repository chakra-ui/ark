import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './use-menu-context'

export interface MenuArrowProps extends HTMLArkProps<'div'> {}

export const MenuArrow = (props: MenuArrowProps) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(() => menu?.().arrowProps, props)

  return <ark.div {...mergedProps} />
}

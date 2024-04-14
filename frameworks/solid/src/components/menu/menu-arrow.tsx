import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'

export interface MenuArrowProps extends HTMLArkProps<'div'> {}

export const MenuArrow = (props: MenuArrowProps) => {
  const context = useMenuContext()
  const mergedProps = mergeProps(() => context().arrowProps, props)

  return <ark.div {...mergedProps} />
}

import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

export interface MenuArrowProps extends HTMLArkProps<'div'> {}

export const MenuArrow: ArkComponent<'div'> = (props) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(() => menu?.().arrowProps, props)

  return <ark.div {...mergedProps} />
}

import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

export interface MenuArrowTipProps extends HTMLArkProps<'div'> {}

export const MenuArrowTip = (props: MenuArrowTipProps) => {
  const menu = useMenuContext()
  const arrowTipProps = mergeProps(() => menu?.().arrowTipProps, props)
  return <ark.div {...arrowTipProps} />
}

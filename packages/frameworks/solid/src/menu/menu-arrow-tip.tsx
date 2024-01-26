import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

export interface MenuArrowTipProps extends HTMLArkProps<'div'> {}

export const MenuArrowTip: ArkComponent<'div'> = (props) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(() => menu?.().arrowTipProps, props)

  return <ark.div {...mergedProps} />
}

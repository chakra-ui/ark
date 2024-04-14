import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'

export interface MenuArrowTipProps extends HTMLArkProps<'div'> {}

export const MenuArrowTip = (props: MenuArrowTipProps) => {
  const context = useMenuContext()
  const mergedProps = mergeProps(() => context().arrowTipProps, props)

  return <ark.div {...mergedProps} />
}

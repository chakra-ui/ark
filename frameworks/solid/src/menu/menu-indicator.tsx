import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './use-menu-context'

export interface MenuIndicatorProps extends HTMLArkProps<'div'> {}

export const MenuIndicator = (props: MenuIndicatorProps) => {
  const context = useMenuContext()
  const mergedProps = mergeProps(() => context().indicatorProps, props)

  return <ark.div {...mergedProps} />
}

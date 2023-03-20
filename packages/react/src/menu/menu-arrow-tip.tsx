import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

export type MenuArrowTipProps = HTMLArkProps<'div'>

export const MenuArrowTip = forwardRef<'div', MenuArrowTipProps>((props, ref) => {
  const { arrowTipProps } = useMenuContext() as UseMenuReturn['api']
  const mergedProps = mergeProps(arrowTipProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

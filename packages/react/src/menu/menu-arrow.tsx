import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

export type MenuArrowProps = HTMLArkProps<'div'>

export const MenuArrow = forwardRef<'div'>((props, ref) => {
  const { arrowProps } = useMenuContext() as UseMenuReturn['api']
  const mergedProps = mergeProps(arrowProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'
import type { UseMenuReturn } from './use-menu'

export type MenuArrowProps = HTMLArkProps<'div'>

export const MenuArrow = forwardRef<'div', MenuArrowProps>((props, ref) => {
  const { arrowProps } = useMenuContext() as UseMenuReturn['api']
  const mergedProps = mergeProps(arrowProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

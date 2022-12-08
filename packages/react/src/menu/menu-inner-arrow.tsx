import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'
import type { UseMenuReturn } from './use-menu'

export type MenuInnerArrowProps = HTMLArkProps<'div'>

export const MenuInnerArrow = forwardRef<'div', MenuInnerArrowProps>((props, ref) => {
  const { innerArrowProps } = useMenuContext() as UseMenuReturn['api']
  const mergedProps = mergeProps(innerArrowProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

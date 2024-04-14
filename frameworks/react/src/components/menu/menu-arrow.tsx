import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../../factory'
import { useMenuContext } from './use-menu-context'

export interface MenuArrowProps extends HTMLArkProps<'div'> {}

export const MenuArrow = forwardRef<HTMLDivElement, MenuArrowProps>((props, ref) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(menu.arrowProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

MenuArrow.displayName = 'MenuArrow'

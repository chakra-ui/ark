import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

export interface MenuArrowTipProps extends HTMLArkProps<'div'> {}

export const MenuArrowTip = forwardRef<HTMLDivElement, MenuArrowTipProps>((props, ref) => {
  const api = useMenuContext() as UseMenuReturn['api']
  const mergedProps = mergeProps(api.arrowTipProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

MenuArrowTip.displayName = 'MenuArrowTip'

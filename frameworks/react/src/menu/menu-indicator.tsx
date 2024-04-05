import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './use-menu-context'

export interface MenuIndicatorProps extends HTMLArkProps<'div'> {}

export const MenuIndicator = forwardRef<HTMLDivElement, MenuIndicatorProps>((props, ref) => {
  const context = useMenuContext()
  const mergedProps = mergeProps(context.indicatorProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

MenuIndicator.displayName = 'MenuIndicator'

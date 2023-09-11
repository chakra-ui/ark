import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

export type MenuPositionerProps = HtmlArkProps<'div'>

export const MenuPositioner = forwardRef<HTMLDivElement, MenuPositionerProps>((props, ref) => {
  const api = useMenuContext() as UseMenuReturn['api']
  const mergedProps = mergeProps(api?.positionerProps ?? {}, props)

  return <ark.div {...mergedProps} ref={ref} />
})

MenuPositioner.displayName = 'MenuPositioner'

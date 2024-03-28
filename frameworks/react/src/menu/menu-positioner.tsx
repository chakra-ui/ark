import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

export interface MenuPositionerProps extends HTMLArkProps<'div'> {}

export const MenuPositioner = forwardRef<HTMLDivElement, MenuPositionerProps>((props, ref) => {
  const api = useMenuContext() as UseMenuReturn['api']
  const mergedProps = mergeProps(api?.positionerProps ?? {}, props)
  const presenceApi = usePresenceContext()

  if (presenceApi.isUnmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={ref} />
})

MenuPositioner.displayName = 'MenuPositioner'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useMenuContext } from './use-menu-context'

export interface MenuPositionerProps extends HTMLArkProps<'div'> {}

export const MenuPositioner = forwardRef<HTMLDivElement, MenuPositionerProps>((props, ref) => {
  const context = useMenuContext()
  const mergedProps = mergeProps(context.positionerProps, props)
  const presenceApi = usePresenceContext()

  if (presenceApi.isUnmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={ref} />
})

MenuPositioner.displayName = 'MenuPositioner'

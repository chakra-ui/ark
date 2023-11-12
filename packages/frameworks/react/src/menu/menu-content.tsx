import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useMenuContext } from './menu-context'
import type { UseMenuReturn } from './use-menu'

export interface MenuContentProps extends HTMLArkProps<'div'> {}

export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>((props, ref) => {
  const api = useMenuContext() as UseMenuReturn['api']
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(api?.contentProps ?? {}, presenceApi.getPresenceProps(ref), props)

  if (presenceApi.isUnmounted) {
    return null
  }

  return <ark.div {...mergedProps} />
})

MenuContent.displayName = 'MenuContent'

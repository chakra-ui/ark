import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useMenuContext } from './use-menu-context'

export interface MenuContentProps extends HTMLArkProps<'div'> {}

export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>((props, ref) => {
  const context = useMenuContext()
  const presenceContext = usePresenceContext()
  const mergedProps = mergeProps(context.contentProps, presenceContext.getPresenceProps(ref), props)

  if (presenceContext.isUnmounted) {
    return null
  }

  return <ark.div {...mergedProps} />
})

MenuContent.displayName = 'MenuContent'

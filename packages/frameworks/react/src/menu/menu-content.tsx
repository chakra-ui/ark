import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import type { Assign } from '../types'
import { useMenuContext } from './menu-context'
import type { UseMenuReturn } from './use-menu'

export interface MenuContentProps
  extends Assign<HTMLArkProps<'div'>, Omit<PresenceProps, 'children'>> {}

export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>((props, ref) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useMenuContext() as UseMenuReturn['api']

  return (
    <Presence present={api?.isOpen} {...presenceProps}>
      <MenuInnerContent ref={ref} {...localProps} />
    </Presence>
  )
})

MenuContent.displayName = 'MenuContent'

const MenuInnerContent = forwardRef<HTMLDivElement, MenuContentProps>(
  function MenuInnerContent(props, ref) {
    const api = useMenuContext() as UseMenuReturn['api']
    const mergedProps = mergeProps(api?.contentProps ?? {}, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

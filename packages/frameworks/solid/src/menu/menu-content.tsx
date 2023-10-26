import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import type { Assign } from '../types'
import { useMenuContext } from './menu-context'

export interface MenuContentProps
  extends Assign<HTMLArkProps<'div'>, Omit<PresenceProps, 'fallback'>> {}

export const MenuContent = (props: MenuContentProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useMenuContext()
  const mergedProps = mergeProps(() => api?.().contentProps, localProps)

  return (
    <Presence
      present={api?.().isOpen}
      {...presenceProps}
      fallback={<div {...api().contentProps} />}
    >
      <ark.div {...mergedProps} />
    </Presence>
  )
}

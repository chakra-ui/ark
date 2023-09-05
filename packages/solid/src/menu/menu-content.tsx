import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import { useMenuContext } from './menu-context'

export type MenuContentProps = HTMLArkProps<'div'> & PresenceProps

export const MenuContent = (props: MenuContentProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useMenuContext()
  const mergedProps = mergeProps(() => api?.().contentProps, localProps)

  return (
    <Presence present={api?.().isOpen} {...presenceProps}>
      <ark.div {...mergedProps} />
    </Presence>
  )
}

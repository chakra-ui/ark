import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { splitPresenceProps } from '../presence'
import { useMenuContext } from './menu-context'
import { MenuPresence, type MenuPresenceProps } from './menu-presence'

export type MenuContentProps = HTMLArkProps<'div'> & MenuPresenceProps

export const MenuContent = (props: MenuContentProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const menu = useMenuContext()
  const contentProps = mergeProps(() => menu?.().contentProps, localProps)

  return (
    <MenuPresence {...presenceProps}>
      <ark.div {...contentProps} />
    </MenuPresence>
  )
}

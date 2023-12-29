import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, type PresenceProps } from '../presence'
import { emits, props } from '../presence/presence.props'
import type { Assign } from '../types'
import { useMenuContext } from './menu-context'

export interface MenuContentProps extends Assign<HTMLArkProps<'div'>, PresenceProps> {}

export const MenuContent = defineComponent<MenuContentProps>(
  (props, { slots, attrs }) => {
    const api = useMenuContext()

    return () => (
      <Presence {...props} present={props.present !== undefined ? props.present : api.value.isOpen}>
        <ark.div {...api.value.contentProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
      </Presence>
    )
  },
  {
    name: 'MenuContent',
    props,
    emits,
  },
)

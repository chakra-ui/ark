import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, type PresenceProps } from '../presence'
import { emits, props } from '../presence/presence.props'
import type { Assign } from '../types'
import { useMenuContext } from './menu-context'
import type { ComponentWithProps } from '../utils'

export interface MenuContentProps extends Assign<HTMLArkProps<'div'>, PresenceProps> {}

export const MenuContent: ComponentWithProps<MenuContentProps> = defineComponent({
  name: 'MenuContent',
  props,
  emits,
  setup(props, { slots, attrs }) {
    const api = useMenuContext()

    return () => (
      <Presence {...props} present={props.present !== undefined ? props.present : api.value.isOpen}>
        <ark.div {...api.value.contentProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
      </Presence>
    )
  },
})

import { defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { type PresenceProps, usePresenceContext } from '../presence'
import { emits, props } from '../presence/presence.props'
import { useMenuContext } from './use-menu-context'

export interface MenuContentProps extends Assign<HTMLArkProps<'div'>, PresenceProps> {}

export const MenuContent = defineComponent<MenuContentProps>(
  (_, { slots, attrs }) => {
    const api = useMenuContext()
    const presenceApi = usePresenceContext()

    return () =>
      presenceApi.value.unmounted ? null : (
        <ark.div {...api.value.contentProps} {...presenceApi.value.presenceProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
      )
  },
  {
    name: 'MenuContent',
    props,
    emits,
  },
)

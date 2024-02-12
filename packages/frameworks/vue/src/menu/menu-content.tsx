import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext, type PresenceProps } from '../presence'
import { emits, props } from '../presence/presence.props'
import type { Assign } from '../types'
import { useMenuContext } from './menu-context'

export interface MenuContentProps extends Assign<HTMLArkProps<'div'>, PresenceProps> {}

export const MenuContent = defineComponent<MenuContentProps>(
  (_, { slots, attrs }) => {
    const api = useMenuContext()
    const presenceApi = usePresenceContext()

    return () => (
      <>
        {presenceApi.value.isUnmounted ? null : (
          <ark.div {...api.value.contentProps} {...attrs}>
            {slots.default?.()}
          </ark.div>
        )}
      </>
    )
  },
  {
    name: 'MenuContent',
    props,
    emits,
  },
)

import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useMenuContext } from './use-menu-context'

export interface MenuPositionerProps extends HTMLArkProps<'div'> {}

export const MenuPositioner = defineComponent<MenuPositionerProps>(
  (_, { slots, attrs }) => {
    const api = useMenuContext()
    const presenceApi = usePresenceContext()

    return () => (
      <>
        {presenceApi.value.isUnmounted ? null : (
          <ark.div {...api.value.positionerProps} {...attrs}>
            {slots.default?.()}
          </ark.div>
        )}
      </>
    )
  },
  {
    name: 'MenuPositioner',
  },
)

import { computed, defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { usePresenceContext } from '../presence'
import { useMenuContext } from './menu-context'

export interface MenuTriggerProps extends HTMLArkProps<'button'> {}

export const MenuTrigger = defineComponent<MenuTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useMenuContext()
    const presenceApi = usePresenceContext()

    const triggerProps = computed(() => ({
      ...api.value.triggerProps,
      'aria-controls': presenceApi.value.isUnmounted
        ? undefined
        : api.value.triggerProps['aria-controls'],
    }))

    return () => (
      <ark.button {...triggerProps.value} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'MenuTrigger',
  },
)

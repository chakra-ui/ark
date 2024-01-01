import { computed, defineComponent, onMounted } from 'vue'
import { PresenceProvider, usePresence, type UsePresenceProps } from '../presence'
import { emits as presenceEmits, props as presenceProps } from '../presence/presence.props'
import {
  MenuMachineProvider,
  MenuProvider,
  MenuTriggerItemProvider,
  useMenuContext,
  useMenuMachineContext,
} from './menu-context'
import { emits, props } from './menu.props'
import { useMenu, type UseMenuProps } from './use-menu'

export interface MenuProps extends UseMenuProps, UsePresenceProps {}

export const Menu = defineComponent<MenuProps>(
  (props, { slots, emit }) => {
    const { api, machine } = useMenu(props, emit)

    const parentApi = useMenuContext()
    const parentMachine = useMenuMachineContext()

    onMounted(() => {
      if (!parentMachine) return
      parentApi.value.setChild(machine)
      api.value.setParent(parentMachine)
    })

    const isOpen = computed(() => api.value.isOpen)

    const presenceProps = computed(() => ({
      present: props.present || isOpen.value,
      lazyMount: props.lazyMount,
      unmountOnExit: props.unmountOnExit,
    }))
    const presenceApi = usePresence(presenceProps as any, emit)

    MenuTriggerItemProvider(computed(() => parentApi.value.getTriggerItemProps(api.value)))

    MenuMachineProvider(machine)

    MenuProvider(api)

    PresenceProvider(presenceApi)

    return () => {
      return slots.default?.(api.value)
    }
  },
  {
    name: 'Menu',
    props: {
      ...props,
      ...presenceProps,
    },
    emits: {
      ...emits,
      ...presenceEmits,
    },
  },
)

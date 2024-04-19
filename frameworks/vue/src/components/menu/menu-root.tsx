import { computed, defineComponent, onMounted } from 'vue'
import { PresenceProvider, type UsePresenceProps, usePresence } from '../presence'
import { emits as presenceEmits, props as presenceProps } from '../presence/presence.props'
import { emits, props } from './menu.props'
import { type UseMenuProps, useMenu } from './use-menu'
import { MenuProvider, useMenuContext } from './use-menu-context'
import { MenuMachineProvider, useMenuMachineContext } from './use-menu-machine-context'
import { MenuTriggerItemProvider } from './use-menu-trigger-item-context'

export interface MenuRootProps extends UseMenuProps, UsePresenceProps {}

export const MenuRoot = defineComponent<MenuRootProps>(
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
    const presenceApi = usePresence(presenceProps, emit)

    MenuTriggerItemProvider(computed(() => parentApi.value.getTriggerItemProps(api.value)))
    MenuMachineProvider(machine)
    MenuProvider(api)
    PresenceProvider(presenceApi)

    return () => {
      return slots.default?.(api.value)
    }
  },
  {
    name: 'MenuRoot',
    props: {
      ...props,
      ...presenceProps,
    },
    emits: [...emits, ...presenceEmits],
  },
)

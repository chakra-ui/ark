import { computed, defineComponent, onMounted } from 'vue'
import { type ComponentWithProps } from '../utils'
import {
  MenuMachineProvider,
  MenuProvider,
  MenuTriggerItemProvider,
  useMenuContext,
  useMenuMachineContext,
} from './menu-context'
import { emits, props } from './menu.props'
import { useMenu, type UseMenuProps } from './use-menu'

export interface MenuProps extends UseMenuProps {}

export const Menu: ComponentWithProps<UseMenuProps> = defineComponent({
  name: 'Menu',
  props,
  emits,
  setup(props, { slots, emit }) {
    const { api, machine } = useMenu(props, emit)

    const parentApi = useMenuContext()
    const parentMachine = useMenuMachineContext()

    onMounted(() => {
      if (!parentMachine) return
      parentApi.value.setChild(machine)
      api.value.setParent(parentMachine)
    })

    MenuTriggerItemProvider(computed(() => parentApi.value.getTriggerItemProps(api.value)))

    MenuMachineProvider(machine)

    MenuProvider(api)

    return () => {
      return slots.default?.(api.value)
    }
  },
})

/* eslint-disable vue/no-reserved-component-names */

import { computed, defineComponent, onMounted, type PropType } from 'vue'
import { createVueProps, type ComponentWithProps } from '../utils'
import {
  MenuMachineProvider,
  MenuProvider,
  MenuTriggerItemProvider,
  useMenuContext,
  useMenuMachineContext,
} from './menu-context'
import { useMenu, type UseMenuProps } from './use-menu'

export type MenuState = {
  isOpen: boolean
  onClose: () => void
}

export type MenuProps = UseMenuProps & { isOpen?: boolean }

const VueProps = createVueProps<MenuProps>({
  anchorPoint: {
    type: Object as PropType<MenuProps['anchorPoint']>,
  },
  'aria-label': {
    type: String as PropType<MenuProps['aria-label']>,
  },
  closeOnSelect: {
    type: Boolean as PropType<MenuProps['closeOnSelect']>,
    default: true,
  },
  dir: {
    type: String as PropType<MenuProps['dir']>,
  },
  getRootNode: {
    type: Function as PropType<MenuProps['getRootNode']>,
  },
  id: {
    type: String as PropType<MenuProps['id']>,
  },
  ids: {
    type: Object as PropType<MenuProps['ids']>,
  },
  isOpen: {
    type: Boolean as PropType<MenuProps['isOpen']>,
    default: false,
  },
  loop: {
    type: Boolean as PropType<MenuProps['loop']>,
  },
  positioning: {
    type: Object as PropType<MenuProps['positioning']>,
  },
  value: {
    type: Object as PropType<MenuProps['value']>,
  },
})

export const Menu: ComponentWithProps<MenuProps> = defineComponent({
  name: 'Menu',
  props: VueProps,
  emits: ['close', 'open', 'select', 'value-change'],
  setup(props, { slots, emit }) {
    const { api, menuMachine } = useMenu(emit, props as MenuProps)

    const parentApi = useMenuContext(undefined)
    const parentMachine = useMenuMachineContext(undefined)

    onMounted(() => {
      if (props.isOpen && !api.value.isOpen) {
        api.value.open()
      }

      if (!parentMachine) return
      parentApi.value.setChild(menuMachine)
      api.value.setParent(parentMachine)
    })

    const getTriggerItemProps = computed(() => () => parentApi.value.getTriggerItemProps(api.value))

    MenuTriggerItemProvider(getTriggerItemProps.value)

    MenuMachineProvider(menuMachine)

    MenuProvider(api)

    return () => slots.default?.({ isOpen: api.value.isOpen, close: api.value.close })
  },
})

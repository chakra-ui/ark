import { computed, defineComponent, onMounted, type PropType } from 'vue'
import { type Assign } from '../types'
import { type ComponentWithProps } from '../utils'
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

export type MenuProps = Assign<UseMenuProps['context'], { isOpen?: boolean }>

export const Menu: ComponentWithProps<MenuProps> = defineComponent({
  name: 'Menu',
  props: {
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
  },
  emits: ['close', 'open', 'select', 'value-change'],
  setup(props, { slots, emit, expose }) {
    const menuProps = computed<UseMenuProps>(() => ({
      context: props,
      emit,
    }))

    const { api, menuMachine } = useMenu(menuProps.value)

    const parentApi = useMenuContext(undefined)
    const parentMachine = useMenuMachineContext(undefined)

    const exposeProps = computed<MenuState>(() => ({
      isOpen: api.value.isOpen,
      onClose: api.value.close,
    }))

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

    expose({
      context: exposeProps,
    })

    return () => slots.default?.()
  },
})

/* eslint-disable vue/no-reserved-component-names */

import type { Context } from '@zag-js/menu'
import { computed, defineComponent, onMounted, type PropType } from 'vue'
import type { Optional } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import {
  MenuMachineProvider,
  MenuProvider,
  MenuTriggerItemProvider,
  useMenuContext,
  useMenuMachineContext,
} from './menu-context'
import { useMenu } from './use-menu'

export type MenuState = {
  isOpen: boolean
  onClose: () => void
}

export type UseMenuProps = Context & { isOpen?: boolean }

const VueProps = createVueProps<UseMenuProps>({
  anchorPoint: {
    type: Object as PropType<UseMenuProps['anchorPoint']>,
  },
  'aria-label': {
    type: String as PropType<UseMenuProps['aria-label']>,
  },
  closeOnSelect: {
    type: Boolean as PropType<UseMenuProps['closeOnSelect']>,
    default: true,
  },
  dir: {
    type: String as PropType<UseMenuProps['dir']>,
  },
  getRootNode: {
    type: Function as PropType<UseMenuProps['getRootNode']>,
  },
  id: {
    type: String as PropType<UseMenuProps['id']>,
  },
  ids: {
    type: Object as PropType<UseMenuProps['ids']>,
  },
  isOpen: {
    type: Boolean as PropType<UseMenuProps['isOpen']>,
    default: false,
  },
  loop: {
    type: Boolean as PropType<UseMenuProps['loop']>,
  },
  positioning: {
    type: Object as PropType<UseMenuProps['positioning']>,
  },
  value: {
    type: Object as PropType<UseMenuProps['value']>,
  },
})

export const Menu: ComponentWithProps<Partial<UseMenuProps>> = defineComponent({
  name: 'Menu',
  props: VueProps,
  emits: ['close', 'open', 'select', 'value-change'],
  setup(props, { slots, emit, expose }) {
    const { api, menuMachine } = useMenu(emit, props as MenuProps)

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

    return () => slots.default?.({ isOpen: api.value.isOpen, close: api.value.close })
  },
})

export type MenuProps = Optional<UseMenuProps, 'id'>

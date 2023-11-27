import { type connect, type OptionItemProps } from '@zag-js/menu'
import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { type ComponentWithProps } from '../utils'
import { useMenuContext } from './menu-context'

export type MenuOptionItemState = { isActive: boolean }
export type MenuOptionItemParams = Parameters<ReturnType<typeof connect>['getOptionItemProps']>[0]
export type MenuOptionItemProps = Assign<HTMLArkProps<'div'>, MenuOptionItemParams>

export const MenuOptionItem: ComponentWithProps<MenuOptionItemProps> = defineComponent({
  name: 'MenuOptionItem',
  props: {
    id: {
      type: String as PropType<MenuOptionItemProps['id']>,
    },
    disabled: {
      type: Boolean as PropType<MenuOptionItemProps['disabled']>,
    },
    valueText: {
      type: String as PropType<MenuOptionItemProps['valueText']>,
    },
    closeOnSelect: {
      type: Boolean as PropType<MenuOptionItemProps['closeOnSelect']>,
      default: true,
    },
    name: {
      type: String as PropType<MenuOptionItemProps['name']>,
      required: true,
    },
    type: {
      type: String as PropType<MenuOptionItemProps['type']>,
      required: true,
    },
    value: {
      type: String as PropType<MenuOptionItemProps['value']>,
      required: true,
    },
  },
  emits: ['checked-change'],
  setup(props, { slots, attrs, emit, expose }) {
    const menuOptionItemProps = computed<OptionItemProps>(() => ({
      name: props.name,
      type: props.type,
      value: props.value,
      closeOnSelect: props.closeOnSelect,
      disabled: props.disabled,
      id: props.id,
      valueText: props.valueText,
      onCheckedChange(checked) {
        emit('checked-change', checked)
      },
    }))

    const api = useMenuContext()

    const optionCheckedComputed = computed(() =>
      api.value.getOptionItemState(menuOptionItemProps.value),
    )

    expose({
      isActive: optionCheckedComputed,
    })

    return () => (
      <ark.div {...api.value.getOptionItemProps(menuOptionItemProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})

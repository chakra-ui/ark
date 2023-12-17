import type { OptionItemProps } from '@zag-js/menu'
import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { useMenuContext } from './menu-context'

export interface MenuOptionItemProps extends HTMLArkProps<'div'>, OptionItemProps {}

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
      default: undefined,
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
  setup(props, { slots, attrs, emit }) {
    const menuOptionItemProps = computed<OptionItemProps>(() => ({
      ...props,
      onCheckedChange(checked) {
        emit('checked-change', checked)
      },
    }))

    const api = useMenuContext()

    return () => (
      <ark.div {...api.value.getOptionItemProps(menuOptionItemProps.value)} {...attrs}>
        {slots.default?.(api.value.getOptionItemState(menuOptionItemProps.value))}
      </ark.div>
    )
  },
})

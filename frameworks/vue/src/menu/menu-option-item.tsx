import type { OptionItemProps } from '@zag-js/menu'
import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useMenuContext } from './menu-context'
import { MenuOptionItemPropsProvider } from './use-menu-option-item-context'

export interface MenuOptionItemProps extends Assign<HTMLArkProps<'div'>, OptionItemProps> {}

export const MenuOptionItem = defineComponent<MenuOptionItemProps>(
  (props, { slots, attrs, emit }) => {
    const menuOptionItemProps = computed<OptionItemProps>(() => ({
      ...props,
      onCheckedChange(checked) {
        emit('checked-change', checked)
      },
    }))

    const api = useMenuContext()
    MenuOptionItemPropsProvider(props)

    return () => (
      <ark.div {...api.value.getOptionItemProps(menuOptionItemProps.value)} {...attrs}>
        {slots.default?.(api.value.getOptionItemState(menuOptionItemProps.value))}
      </ark.div>
    )
  },
  {
    name: 'MenuOptionItem',
    props: {
      id: {
        type: String as PropType<MenuOptionItemProps['id']>,
      },
      disabled: {
        type: Boolean as PropType<MenuOptionItemProps['disabled']>,
        default: undefined,
      },
      valueText: {
        type: String as PropType<MenuOptionItemProps['valueText']>,
        default: undefined,
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
  },
)

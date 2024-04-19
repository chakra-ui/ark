import type { OptionItemProps } from '@zag-js/menu'
import { type PropType, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { MenuItemProvider } from './use-menu-item-context'
import { MenuOptionItemPropsProvider } from './use-menu-option-item-props-context'

export interface MenuCheckboxItemProps extends Assign<HTMLArkProps<'div'>, OptionItemProps> {}

export const MenuCheckboxItem = defineComponent<MenuCheckboxItemProps>(
  (props, { slots, attrs }) => {
    const api = useMenuContext()

    MenuItemProvider(api.value.getItemState(props))
    MenuOptionItemPropsProvider(props)

    return () => (
      <ark.div {...api.value.getOptionItemProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'MenuCheckboxItem',
    props: {
      checked: {},
      disabled: {
        type: Boolean as PropType<OptionItemProps['disabled']>,
        default: undefined,
      },
      type: {
        type: String as PropType<OptionItemProps['type']>,
        default: 'checkbox',
      },
      value: {
        type: String as PropType<OptionItemProps['value']>,
        required: true,
      },
      valueText: {
        type: String as PropType<OptionItemProps['valueText']>,
        default: undefined,
      },
      closeOnSelect: {
        type: Boolean as PropType<OptionItemProps['closeOnSelect']>,
        default: undefined,
      },
    },
  },
)

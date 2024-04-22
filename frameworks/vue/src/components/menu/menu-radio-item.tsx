import type { OptionItemProps } from '@zag-js/menu'
import { type ComputedRef, type PropType, computed, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { MenuItemProvider } from './use-menu-item-context'
import { useMenuItemGroupContext } from './use-menu-item-group-context'
import { MenuOptionItemPropsProvider } from './use-menu-option-item-props-context'

export interface MenuRadioItemProps
  extends Assign<HTMLArkProps<'div'>, Omit<OptionItemProps, 'type' | 'checked'>> {}

export const MenuRadioItem = defineComponent<MenuRadioItemProps>(
  (props, { slots, attrs }) => {
    const menu = useMenuContext()
    const itemGroup = useMenuItemGroupContext()
    const context: ComputedRef<OptionItemProps> = computed(() => ({
      ...props,
      checked: itemGroup.value.value === props.value,
      type: 'radio',
      onCheckedChange: () => itemGroup.value.onValueChange?.({ value: props.value }),
    }))

    const item = computed(() => menu.value.getOptionItemState(context.value))

    MenuItemProvider(item)
    MenuOptionItemPropsProvider(context)

    return () => (
      <ark.div {...menu.value.getOptionItemProps(context.value)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'MenuRadioItem',
    props: {
      closeOnSelect: {
        type: Boolean as PropType<OptionItemProps['closeOnSelect']>,
        default: undefined,
      },
      disabled: {
        type: Boolean as PropType<OptionItemProps['disabled']>,
        default: undefined,
      },
      value: {
        type: String as PropType<OptionItemProps['value']>,
        required: true,
      },
      valueText: {
        type: String as PropType<OptionItemProps['valueText']>,
        default: undefined,
      },
    },
  },
)

import type { OptionItemProps } from '@zag-js/menu'
import { type ComputedRef, type PropType, computed, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { MenuItemProvider } from './use-menu-item-context'
import { MenuOptionItemPropsProvider } from './use-menu-option-item-props-context'

export interface MenuCheckboxItemProps
  extends Assign<HTMLArkProps<'div'>, Omit<OptionItemProps, 'type'>> {}

export const MenuCheckboxItem = defineComponent<MenuCheckboxItemProps>(
  (props, { slots, attrs, emit }) => {
    const context: ComputedRef<OptionItemProps> = computed(() => ({
      ...props,
      type: 'checkbox',
      onCheckedChange: (e) => emit('update:checked', e),
    }))

    const menu = useMenuContext()
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
    name: 'MenuCheckboxItem',
    props: {
      checked: {
        type: Boolean as PropType<OptionItemProps['checked']>,
        default: false,
      },
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
    emits: ['update:checked'],
  },
)

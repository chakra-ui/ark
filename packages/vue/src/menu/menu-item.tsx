import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

type MenuItemParams = Parameters<UseMenuReturn['api']['getItemProps']>[0]

export type MenuItemProps = Assign<HTMLArkProps<'button'>, MenuItemParams>

export const MenuItem: ComponentWithProps<MenuItemProps> = defineComponent({
  name: 'MenuItem',
  props: {
    id: {
      type: String as PropType<MenuItemProps['id']>,
      required: true,
    },
    disabled: {
      type: Boolean as PropType<MenuItemProps['disabled']>,
    },
    valueText: {
      type: String as PropType<MenuItemProps['valueText']>,
    },
    closeOnSelect: {
      type: Boolean as PropType<MenuItemProps['closeOnSelect']>,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useMenuContext()

    return () => (
      <ark.button
        {...api.value.getItemProps({
          id: props.id,
          disabled: props.disabled,
          valueText: props.valueText,
          closeOnSelect: props.closeOnSelect,
        })}
        {...attrs}
      >
        {() => getValidChildren(slots)}
      </ark.button>
    )
  },
})

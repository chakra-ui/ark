import { defineComponent, PropType } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { ComponentWithProps, getValidChildren } from '../utils'
import { useMenuContext } from './menu-context'

export type MenuItemGroupLabelProps = Assign<HTMLArkProps<'label'>, { htmlFor: string }>

export const MenuItemGroupLabel: ComponentWithProps<MenuItemGroupLabelProps> = defineComponent({
  name: 'MenuItemGroupLabel',
  props: {
    htmlFor: {
      type: String as PropType<MenuItemGroupLabelProps['htmlFor']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useMenuContext()

    return () => (
      <ark.label {...api.value.getItemGroupLabelProps({ htmlFor: props.htmlFor })} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.label>
    )
  },
})

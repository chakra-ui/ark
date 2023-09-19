import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { type ComponentWithProps } from '../utils'
import { useToggleGroupContext } from './toggle-group-context'

type ItemProps = {
  value: string
  disabled?: boolean
}

export type ToggleGroupItemProps = Assign<HTMLArkProps<'button'>, ItemProps>

export const ToggleGroupItem: ComponentWithProps<ToggleGroupItemProps> = defineComponent({
  name: 'Toggle',
  props: {
    value: {
      type: String as PropType<ItemProps['value']>,
      required: true,
    },
    disabled: {
      type: Boolean as PropType<ItemProps['disabled']>,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useToggleGroupContext()
    return () => (
      <ark.button {...api.value.getItemProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})

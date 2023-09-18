import { type TriggerProps } from '@zag-js/tabs'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { type ComponentWithProps } from '../utils'
import { useToggleGroupContext } from './toggle-group-context'

export type ToggleProps = Assign<HTMLArkProps<'button'>, TriggerProps>

export const Toggle: ComponentWithProps<ToggleProps> = defineComponent({
  name: 'Toggle',
  props: {
    value: {
      type: String as PropType<ToggleProps['value']>,
      required: true,
    },
    disabled: {
      type: Boolean as PropType<ToggleProps['disabled']>,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useToggleGroupContext()
    return () => (
      <ark.button {...api.value.getToggleProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})

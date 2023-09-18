import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useSwitchContext } from './switch-context'

export type SwitchLabelProps = HTMLArkProps<'span'>

export const SwitchLabel: ComponentWithProps<SwitchLabelProps> = defineComponent({
  name: 'SwitchLabel',
  setup(_, { slots, attrs }) {
    const api = useSwitchContext()

    return () => (
      <ark.span {...api.value.labelProps} {...attrs}>
        {slots.default?.()}
      </ark.span>
    )
  },
})

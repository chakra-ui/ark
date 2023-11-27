import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { useNumberInputContext } from './number-input-context'

export type NumberInputLabelProps = HTMLArkProps<'label'>

export const NumberInputLabel: ComponentWithProps<NumberInputLabelProps> = defineComponent({
  name: 'NumberInputLabel',
  setup(_, { slots, attrs }) {
    const api = useNumberInputContext()

    return () => (
      <ark.label {...api.value.labelProps} {...attrs}>
        {slots.default?.()}
      </ark.label>
    )
  },
})

import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputDecrementTriggerProps = HTMLArkProps<'button'>

export const NumberInputDecrementTrigger = defineComponent({
  name: 'NumberInputDecrementTrigger',
  setup(_, { slots, attrs }) {
    const api = useNumberInputContext()

    return () => (
      <ark.button {...api.value.decrementTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})

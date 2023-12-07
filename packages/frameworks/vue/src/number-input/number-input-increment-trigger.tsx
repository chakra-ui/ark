import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export interface NumberInputIncrementTriggerProps extends HTMLArkProps<'button'> {}

export const NumberInputIncrementTrigger = defineComponent({
  name: 'NumberInputIncrementTrigger',
  setup(_, { slots, attrs }) {
    const api = useNumberInputContext()

    return () => (
      <ark.button {...api.value.incrementTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})

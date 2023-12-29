import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export interface NumberInputDecrementTriggerProps extends HTMLArkProps<'button'> {}

export const NumberInputDecrementTrigger = defineComponent<NumberInputDecrementTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useNumberInputContext()

    return () => (
      <ark.button {...api.value.decrementTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'NumberInputDecrementTrigger',
  },
)

import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useNumberInputContext } from './number-input-context'

export interface NumberInputIncrementTriggerProps extends HTMLArkProps<'button'> {}

export const NumberInputIncrementTrigger = defineComponent<NumberInputIncrementTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useNumberInputContext()

    return () => (
      <ark.button {...api.value.incrementTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'NumberInputIncrementTrigger',
  },
)

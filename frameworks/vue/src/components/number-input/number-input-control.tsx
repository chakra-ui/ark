import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useNumberInputContext } from './number-input-context'

export interface NumberInputControlProps extends HTMLArkProps<'div'> {}

export const NumberInputControl = defineComponent<NumberInputControlProps>(
  (_, { slots, attrs }) => {
    const api = useNumberInputContext()

    return () => (
      <ark.div {...api.value.controlProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'NumberInputControl',
  },
)

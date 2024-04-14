import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useNumberInputContext } from './number-input-context'

export interface NumberInputInputProps extends HTMLArkProps<'input'> {}

export const NumberInputInput = defineComponent<NumberInputInputProps>(
  (_, { attrs }) => {
    const api = useNumberInputContext()

    return () => <ark.input {...api.value.inputProps} {...attrs} />
  },
  {
    name: 'NumberInputInput',
  },
)

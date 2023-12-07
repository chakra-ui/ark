import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export interface NumberInputInputProps extends HTMLArkProps<'input'> {}

export const NumberInputInput = defineComponent({
  name: 'NumberInputInput',
  setup(_, { attrs }) {
    const api = useNumberInputContext()

    return () => <ark.input {...api.value.inputProps} {...attrs} />
  },
})

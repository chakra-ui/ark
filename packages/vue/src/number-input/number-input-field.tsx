import { computed, defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useNumberInputContext } from './number-input-context'

export type NumberInputInputProps = HTMLArkProps<'input'>

export const NumberInputInput: ComponentWithProps<NumberInputInputProps> = defineComponent({
  name: 'NumberInputInput',
  setup(_, { attrs }) {
    const api = useNumberInputContext()

    const inputProps = computed(() => ({
      ...api.value.inputProps,
      modelValue: api.value.value || '',
    }))

    return () => <ark.input {...inputProps.value} {...attrs} />
  },
})

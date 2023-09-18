import { computed, defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputInputProps = HTMLArkProps<'input'>

export const NumberInputInput = defineComponent({
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

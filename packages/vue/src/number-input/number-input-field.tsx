import { computed, defineComponent } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
import { useNumberInputContext } from './number-input-context'

export type NumberInputFieldProps = HTMLArkProps<'input'>

export const NumberInputField: ComponentWithProps<NumberInputFieldProps> = defineComponent({
  name: 'NumberInputField',
  setup(_, { slots, attrs }) {
    const api = useNumberInputContext()

    const inputProps = computed(() => ({
      ...api.value.inputProps,
      modelValue: api.value.value || '',
    }))

    return () => (
      <ark.input {...inputProps.value} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.input>
    )
  },
})

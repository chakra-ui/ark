import { computed, defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useComboboxContext } from './combobox-context'

export interface ComboboxInputProps extends HTMLArkProps<'input'> {}

export const ComboboxInput = defineComponent<ComboboxInputProps>(
  (_, { slots, attrs }) => {
    const api = useComboboxContext()

    const inputProps = computed(() => ({
      ...api.value.inputProps,
      modelValue: api.value.inputValue,
    }))

    return () => (
      <ark.input {...inputProps.value} {...attrs}>
        {slots.default?.()}
      </ark.input>
    )
  },
  {
    name: 'ComboboxInput',
  },
)

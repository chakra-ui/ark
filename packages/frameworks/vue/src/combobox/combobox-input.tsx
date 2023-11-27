import { computed, defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxInputProps = HTMLArkProps<'input'>

export const ComboboxInput = defineComponent({
  name: 'ComboboxInput',
  setup(_, { slots, attrs }) {
    const api = useComboboxContext()

    const inputProps = computed(() => ({
      ...api.value.inputProps,
      modelValue: api.value.inputValue || '',
    }))

    return () => (
      <ark.input {...inputProps.value} {...attrs}>
        {slots.default?.()}
      </ark.input>
    )
  },
})

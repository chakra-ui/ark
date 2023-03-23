import { computed, defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useComboboxContext } from './combobox-context'

export type ComboboxInputProps = HTMLArkProps<'input'>

export const ComboboxInput: ComponentWithProps<ComboboxInputProps> = defineComponent({
  name: 'ComboboxInput',
  setup(_, { slots, attrs }) {
    const api = useComboboxContext()

    const inputProps = computed(() => ({
      ...api.value.inputProps,
      modelValue: api.value.inputValue || '',
    }))

    return () => (
      <ark.input {...inputProps.value} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.input>
    )
  },
})

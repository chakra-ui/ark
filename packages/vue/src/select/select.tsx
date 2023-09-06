import { defineComponent } from 'vue'
import { SelectProvider } from './select-context'
import { emits, props } from './select.props'
import { useSelect, type UseSelectProps } from './use-select'

export type SelectProps = UseSelectProps

export const Select = defineComponent({
  name: 'Select',
  props,
  emits,
  setup(props, { slots, emit }) {
    const api = useSelect(props, emit)
    SelectProvider(api)

    return () => slots?.default?.(api.value)
  },
})

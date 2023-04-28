import { defineComponent, type PropType } from 'vue'
import { type ComponentWithProps } from '../utils'
import { SelectProvider } from './select-context'
import { useSelect, type UseSelectContext } from './use-select'

export type SelectProps = UseSelectContext

const VueSelectProps = {
  modelValue: {
    type: [Object, null] as PropType<SelectProps['modelValue']>,
  },
  loop: {
    type: Boolean as PropType<SelectProps['loop']>,
    default: false,
  },
  closedOnSelect: {
    type: Boolean as PropType<SelectProps['closeOnSelect']>,
    default: true,
  },
  disabled: {
    type: Boolean as PropType<SelectProps['disabled']>,
    default: false,
  },
  readOnly: {
    type: Boolean as PropType<SelectProps['readOnly']>,
    default: false,
  },
  name: {
    type: String as PropType<SelectProps['name']>,
  },
  invalid: {
    type: Boolean as PropType<SelectProps['invalid']>,
  },
  form: {
    type: String as PropType<SelectProps['form']>,
  },
  positioning: {
    type: Object as PropType<SelectProps['positioning']>,
  },
  highlightedOption: {
    type: Object as PropType<SelectProps['highlightedOption']>,
  },
  selectOnTab: {
    type: Boolean as PropType<SelectProps['selectOnTab']>,
  },
  selectedOption: {
    type: Object as PropType<SelectProps['selectedOption']>,
  },
  dir: {
    type: String as PropType<SelectProps['dir']>,
  },
  ids: {
    type: Object as PropType<SelectProps['ids']>,
  },
  getRootNode: {
    type: Function as PropType<SelectProps['getRootNode']>,
  },
}

export const Select: ComponentWithProps<SelectProps> = defineComponent({
  name: 'Select',
  emits: ['change', 'highlight', 'open', 'close', 'update:modelValue'],
  props: VueSelectProps,
  setup(props, { slots, emit }) {
    const api = useSelect(emit, props)

    SelectProvider(api)

    return () => slots?.default?.({ ...api.value })
  },
})

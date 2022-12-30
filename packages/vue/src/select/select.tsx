import { computed, defineComponent, PropType } from 'vue'
import { SelectProvider } from './select-context'
import { useSelect, UseSelectProps } from './use-select'

export interface SelectProps {
  modelValue: UseSelectProps['context']['modelValue']
  isLooped?: UseSelectProps['context']['loop']
  isClosedOnSelect?: UseSelectProps['context']['closeOnSelect']
  isDisabled?: UseSelectProps['context']['disabled']
  isReadOnly?: UseSelectProps['context']['readOnly']
}

export const Select = defineComponent({
  name: 'Select',
  emits: ['change', 'highlight', 'open', 'close', 'update:modelValue'],
  props: {
    modelValue: {
      type: [Object, null] as PropType<SelectProps['modelValue']>,
      default: null,
    },
    isLooped: {
      type: Boolean as PropType<SelectProps['isLooped']>,
      default: false,
    },
    isClosedOnSelect: {
      type: Boolean as PropType<UseSelectProps['context']['closeOnSelect']>,
      default: true,
    },
    isDisabled: {
      type: Boolean as PropType<UseSelectProps['context']['disabled']>,
      default: false,
    },
    isReadOnly: {
      type: Boolean as PropType<UseSelectProps['context']['readOnly']>,
      default: false,
    },
  },
  setup(props, { slots, emit }) {
    const selectProps = computed<UseSelectProps>(() => ({
      context: {
        ...props,
        loop: props.isLooped,
        closeOnSelect: props.isClosedOnSelect,
        disabled: props.isDisabled,
        readOnly: props.isReadOnly,
        modelValue: props.modelValue,
      },
      emit,
    }))

    const { api } = useSelect(selectProps.value)

    SelectProvider(api)

    return () => slots?.default?.()
  },
})

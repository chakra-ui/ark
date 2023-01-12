import { computed, defineComponent, PropType } from 'vue'
import { ark } from '../factory'
import { getValidChildren } from '../utils'
import { CheckboxProvider } from './checkbox-context'
import { useCheckbox, UseCheckboxProps } from './use-checkbox'

type UseCheckboxContext = UseCheckboxProps['context']

export interface CheckboxProps {
  modelValue?: UseCheckboxContext['modelValue']
  isDisabled?: UseCheckboxContext['disabled']
  isReadOnly?: UseCheckboxContext['readOnly']
  isRequired?: UseCheckboxContext['required']
  isIndeterminate?: UseCheckboxContext['indeterminate']
  isChecked?: UseCheckboxContext['checked']
  isFocusable?: UseCheckboxContext['focusable']
}

export const Checkbox = defineComponent({
  name: 'Checkbox',
  emits: ['change', 'update:modelValue'],
  props: {
    modelValue: {
      type: [String, Number] as PropType<CheckboxProps['modelValue']>,
    },
    isDisabled: {
      type: Boolean as PropType<CheckboxProps['isDisabled']>,
    },
    isReadOnly: {
      type: Boolean as PropType<CheckboxProps['isReadOnly']>,
    },
    isRequired: {
      type: Boolean as PropType<CheckboxProps['isRequired']>,
    },
    isIndeterminate: {
      type: Boolean as PropType<CheckboxProps['isIndeterminate']>,
    },
    isChecked: {
      type: Boolean as PropType<CheckboxProps['isChecked']>,
    },
    isFocusable: {
      type: Boolean as PropType<CheckboxProps['isFocusable']>,
    },
  },
  setup(props, { attrs, emit, slots }) {
    const checkboxProps = computed<UseCheckboxProps>(() => ({
      context: {
        ...props,
        focusable: props.isFocusable,
        defaultChecked: props.isChecked,
        disabled: props.isDisabled,
        indeterminate: props.isIndeterminate,
        readOnly: props.isReadOnly,
        required: props.isRequired,
      },
      emit,
    }))

    const api = useCheckbox(checkboxProps.value)

    CheckboxProvider(api)

    return () => (
      <ark.label {...api.value.rootProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.label>
    )
  },
})

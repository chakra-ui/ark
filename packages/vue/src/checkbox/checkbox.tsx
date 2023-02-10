import { computed, defineComponent, PropType } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { ComponentWithProps, getValidChildren } from '../utils'
import { CheckboxProvider } from './checkbox-context'
import { useCheckbox, UseCheckboxProps } from './use-checkbox'

type UseCheckboxContext = UseCheckboxProps['context']

export type CheckboxProps = Assign<HTMLArkProps<'label'>, UseCheckboxContext>

const VueCheckboxProps = {
  'aria-describedby': {
    type: String as PropType<CheckboxProps['aria-describedby']>,
  },
  'aria-label': {
    type: String as PropType<CheckboxProps['aria-label']>,
  },
  'aria-labelledby': {
    type: String as PropType<CheckboxProps['aria-labelledby']>,
  },
  defaultChecked: {
    type: Boolean as PropType<CheckboxProps['defaultChecked']>,
  },
  dir: {
    type: String as PropType<CheckboxProps['dir']>,
  },
  disabled: {
    type: Boolean as PropType<CheckboxProps['disabled']>,
  },
  focusable: {
    type: Boolean as PropType<CheckboxProps['focusable']>,
  },
  form: {
    type: String as PropType<CheckboxProps['form']>,
  },
  getRootNode: {
    type: Function as PropType<CheckboxProps['getRootNode']>,
  },
  ids: {
    type: Object as PropType<CheckboxProps['ids']>,
  },
  indeterminate: {
    type: Boolean as PropType<CheckboxProps['indeterminate']>,
  },
  invalid: {
    type: Boolean as PropType<CheckboxProps['invalid']>,
  },
  modelValue: {
    type: Boolean as PropType<CheckboxProps['modelValue']>,
  },
  name: {
    type: String as PropType<CheckboxProps['name']>,
  },
  readOnly: {
    type: Boolean as PropType<CheckboxProps['readOnly']>,
  },
  required: {
    type: Boolean as PropType<CheckboxProps['required']>,
  },
  value: {
    type: String as PropType<CheckboxProps['value']>,
  },
}

export const Checkbox: ComponentWithProps<CheckboxProps> = defineComponent({
  name: 'Checkbox',
  emits: ['change', 'update:modelValue'],
  props: VueCheckboxProps,
  setup(props, { attrs, emit, slots }) {
    const checkboxProps = computed<UseCheckboxProps>(() => ({
      context: props,
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

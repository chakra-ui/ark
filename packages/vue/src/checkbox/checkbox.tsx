import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { CheckboxProvider } from './checkbox-context'
import { useCheckbox, type UseCheckboxContext } from './use-checkbox'

export type CheckboxProps = Assign<HTMLArkProps<'label'>, UseCheckboxContext>

export const VueCheckboxProps = createVueProps<CheckboxProps>({
  id: {
    type: String as PropType<CheckboxProps['id']>,
  },
  'aria-describedby': {
    type: String as PropType<CheckboxProps['aria-describedby']>,
  },
  'aria-label': {
    type: String as PropType<CheckboxProps['aria-label']>,
  },
  'aria-labelledby': {
    type: String as PropType<CheckboxProps['aria-labelledby']>,
  },
  checked: {
    type: [Boolean, String] as PropType<CheckboxProps['checked']>,
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
  invalid: {
    type: Boolean as PropType<CheckboxProps['invalid']>,
  },
  modelValue: {
    type: [Boolean, String] as PropType<CheckboxProps['modelValue']>,
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
})

export const Checkbox: ComponentWithProps<Partial<CheckboxProps>> = defineComponent({
  name: 'Checkbox',
  emits: ['change', 'update:modelValue', 'update:checked'],
  props: VueCheckboxProps,
  setup(props, { attrs, emit, slots }) {
    const api = useCheckbox(emit, props)

    CheckboxProvider(api)

    return () => (
      <ark.label {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.label>
    )
  },
})

import { type Context } from '@zag-js/checkbox'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign, type Optional } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { CheckboxProvider } from './checkbox-context'
import { useCheckbox } from './use-checkbox'

export type CheckboxContext = Context & {
  modelValue?: Context['checked']
}

export type UseCheckboxProps = Assign<HTMLArkProps<'label'>, CheckboxContext>

export const VueCheckboxProps = createVueProps<UseCheckboxProps>({
  id: {
    type: String as PropType<UseCheckboxProps['id']>,
  },
  'aria-describedby': {
    type: String as PropType<UseCheckboxProps['aria-describedby']>,
  },
  'aria-label': {
    type: String as PropType<UseCheckboxProps['aria-label']>,
  },
  'aria-labelledby': {
    type: String as PropType<UseCheckboxProps['aria-labelledby']>,
  },
  checked: {
    type: [Boolean, String] as PropType<UseCheckboxProps['checked']>,
  },
  dir: {
    type: String as PropType<UseCheckboxProps['dir']>,
  },
  disabled: {
    type: Boolean as PropType<UseCheckboxProps['disabled']>,
  },
  focusable: {
    type: Boolean as PropType<UseCheckboxProps['focusable']>,
  },
  form: {
    type: String as PropType<UseCheckboxProps['form']>,
  },
  getRootNode: {
    type: Function as PropType<UseCheckboxProps['getRootNode']>,
  },
  ids: {
    type: Object as PropType<UseCheckboxProps['ids']>,
  },
  invalid: {
    type: Boolean as PropType<UseCheckboxProps['invalid']>,
  },
  modelValue: {
    type: [Boolean, String] as PropType<UseCheckboxProps['modelValue']>,
  },
  name: {
    type: String as PropType<UseCheckboxProps['name']>,
  },
  readOnly: {
    type: Boolean as PropType<UseCheckboxProps['readOnly']>,
  },
  required: {
    type: Boolean as PropType<UseCheckboxProps['required']>,
  },
  value: {
    type: String as PropType<UseCheckboxProps['value']>,
  },
})

export const Checkbox: ComponentWithProps<Partial<UseCheckboxProps>> = defineComponent({
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

export type CheckboxProps = Optional<CheckboxContext, 'id'>

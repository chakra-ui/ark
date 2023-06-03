/* eslint-disable vue/no-reserved-component-names */
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { createVueProps } from '../utils'
import { SwitchProvider } from './switch-context'
import { useSwitch, type UseSwitchProps } from './use-switch'

export type SwitchProps = Assign<HTMLArkProps<'label'>, UseSwitchProps>

const VueProps = createVueProps<SwitchProps>({
  checked: {
    type: Boolean as PropType<SwitchProps['checked']>,
  },
  dir: {
    type: String as PropType<SwitchProps['dir']>,
  },
  disabled: {
    type: Boolean as PropType<SwitchProps['disabled']>,
  },
  focusable: {
    type: Boolean as PropType<SwitchProps['focusable']>,
  },
  form: {
    type: String as PropType<SwitchProps['form']>,
  },
  getRootNode: {
    type: Function as PropType<SwitchProps['getRootNode']>,
  },
  id: {
    type: String as PropType<SwitchProps['id']>,
  },
  ids: {
    type: Object as PropType<SwitchProps['ids']>,
  },
  invalid: {
    type: Boolean as PropType<SwitchProps['invalid']>,
  },
  label: {
    type: String as PropType<SwitchProps['label']>,
  },
  modelValue: {
    type: Boolean as PropType<SwitchProps['modelValue']>,
  },
  name: {
    type: String as PropType<SwitchProps['name']>,
  },
  readOnly: {
    type: Boolean as PropType<SwitchProps['readOnly']>,
  },
  required: {
    type: Boolean as PropType<SwitchProps['required']>,
  },
  value: {
    type: [String, Number] as PropType<SwitchProps['value']>,
  },
})

export const Switch = defineComponent({
  name: 'Switch',
  props: VueProps,
  emit: ['change', 'update:modelValue'],
  setup(props, { slots, attrs, emit }) {
    const api = useSwitch(emit, props)

    SwitchProvider(api)

    return () => (
      <ark.label {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.label>
    )
  },
})

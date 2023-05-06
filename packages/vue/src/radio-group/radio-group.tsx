import type { Context } from '@zag-js/radio-group'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { RadioGroupProvider } from './radio-context'
import { useRadioGroup } from './use-radio-group'

export type RadioGroupContext = Context & {
  modelValue?: Context['value']
}
export type RadioGroupProps = Assign<HTMLArkProps<'div'>, RadioGroupContext>

const VueProps = createVueProps<RadioGroupProps>({
  dir: {
    type: String as PropType<RadioGroupProps['dir']>,
  },
  disabled: {
    type: Boolean as PropType<RadioGroupProps['disabled']>,
  },
  form: {
    type: String as PropType<RadioGroupProps['form']>,
  },
  getRootNode: {
    type: Function as PropType<RadioGroupProps['getRootNode']>,
  },
  id: {
    type: String as PropType<RadioGroupProps['id']>,
  },
  ids: {
    type: Object as PropType<RadioGroupProps['ids']>,
  },
  modelValue: {
    type: String as PropType<RadioGroupProps['modelValue']>,
  },
  name: {
    type: String as PropType<RadioGroupProps['name']>,
  },
  orientation: {
    type: String as PropType<RadioGroupProps['orientation']>,
  },
  readOnly: {
    type: Boolean as PropType<RadioGroupProps['readOnly']>,
  },
  value: {
    type: String as PropType<RadioGroupProps['value']>,
  },
})

export const RadioGroup: ComponentWithProps<Partial<RadioGroupProps>> = defineComponent({
  name: 'RadioGroup',
  props: VueProps,
  emits: ['change', 'update:modelValue'],
  setup(props, { slots, attrs, emit }) {
    const api = useRadioGroup(emit, props)

    RadioGroupProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {() => slots?.default?.(api.value)}
      </ark.div>
    )
  },
})

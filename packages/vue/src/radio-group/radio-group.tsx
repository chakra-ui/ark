import type { Context } from '@zag-js/radio-group'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign, type Optional } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { RadioGroupProvider } from './radio-context'
import { useRadioGroup } from './use-radio-group'

export type RadioGroupContext = Context & {
  modelValue?: Context['value']
}
export type UseRadioGroupProps = Assign<HTMLArkProps<'div'>, RadioGroupContext>

const VueProps = createVueProps<UseRadioGroupProps>({
  dir: {
    type: String as PropType<UseRadioGroupProps['dir']>,
  },
  disabled: {
    type: Boolean as PropType<UseRadioGroupProps['disabled']>,
  },
  form: {
    type: String as PropType<UseRadioGroupProps['form']>,
  },
  getRootNode: {
    type: Function as PropType<UseRadioGroupProps['getRootNode']>,
  },
  id: {
    type: String as PropType<UseRadioGroupProps['id']>,
  },
  ids: {
    type: Object as PropType<UseRadioGroupProps['ids']>,
  },
  modelValue: {
    type: String as PropType<UseRadioGroupProps['modelValue']>,
  },
  name: {
    type: String as PropType<UseRadioGroupProps['name']>,
  },
  orientation: {
    type: String as PropType<UseRadioGroupProps['orientation']>,
  },
  readOnly: {
    type: Boolean as PropType<UseRadioGroupProps['readOnly']>,
  },
  value: {
    type: String as PropType<UseRadioGroupProps['value']>,
  },
})

export const RadioGroup: ComponentWithProps<Partial<UseRadioGroupProps>> = defineComponent({
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

export type RadioGroupProps = Optional<RadioGroupContext, 'id'>

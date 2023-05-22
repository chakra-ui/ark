import type { Context } from '@zag-js/radio-group'
import { defineComponent, reactive, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { RadioProvider, useRadioGroupContext } from './radio-context'

export type RadioContext = {
  value: string
  /**
   * If `true`, the radio will be disabled
   */
  disabled?: boolean
  /**
   * If `true`, the radio will be readonly
   */
  readOnly?: boolean
  /**
   * If `true`, the radio is marked as invalid.
   */
  invalid?: boolean

  modelValue?: Context['value']
}

export type RadioProps = Assign<HTMLArkProps<'label'>, RadioContext>

const VueProps = createVueProps<RadioProps>({
  id: {
    type: String as PropType<RadioProps['id']>,
  },
  value: {
    type: String as PropType<RadioProps['value']>,
    required: true,
  },
  disabled: {
    type: Boolean as PropType<RadioProps['disabled']>,
  },
  invalid: {
    type: Boolean as PropType<RadioProps['invalid']>,
  },
  readOnly: {
    type: Boolean as PropType<RadioProps['readOnly']>,
  },
})

export const Radio: ComponentWithProps<Partial<RadioProps>> = defineComponent({
  name: 'Radio',
  props: VueProps,
  setup(props, { slots, attrs }) {
    const groupApi = useRadioGroupContext()
    const context = reactive(props) as RadioProps

    RadioProvider(context)

    return () => (
      <ark.label
        {...groupApi.value.getRadioProps({
          value: context.value || '',
          disabled: context.disabled,
        })}
        {...attrs}
      >
        {() => slots?.default?.(context)}
      </ark.label>
    )
  },
})

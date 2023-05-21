import { defineComponent, reactive, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { RadioProvider, useRadioGroupContext, type RadioContext } from './radio-context'

export type RadioProps = Assign<HTMLArkProps<'label'>, RadioContext>

const VueProps = createVueProps<RadioProps>({
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
    const context = reactive(props) as RadioContext

    RadioProvider(context)

    return () => (
      <ark.label
        {...groupApi.value.getRadioProps({
          value: context.value || '',
          disabled: context.disabled,
          invalid: context.invalid,
          readOnly: context.readOnly,
        })}
        {...attrs}
      >
        {slots?.default?.(context)}
      </ark.label>
    )
  },
})

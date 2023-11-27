import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { useRadioGroupContext } from './radio-group-context'

export type RadioGroupLabelProps = HTMLArkProps<'label'>

export const RadioGroupLabel: ComponentWithProps<RadioGroupLabelProps> = defineComponent({
  name: 'RadioGroupLabel',
  setup(_, { slots, attrs }) {
    const groupApi = useRadioGroupContext()

    return () => (
      <ark.label {...groupApi.value.labelProps} {...attrs}>
        {slots.default?.()}
      </ark.label>
    )
  },
})

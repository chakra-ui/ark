import { defineComponent } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
import { useRadioGroupContext } from './radio-context'

export type RadioGroupLabelProps = HTMLArkProps<'label'>

export const RadioGroupLabel: ComponentWithProps<RadioGroupLabelProps> = defineComponent({
  name: 'RadioGroupLabel',
  setup(_, { slots, attrs }) {
    const groupApi = useRadioGroupContext()

    return () => (
      <ark.label {...groupApi.value.labelProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.label>
    )
  },
})

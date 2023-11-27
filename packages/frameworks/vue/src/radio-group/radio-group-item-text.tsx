import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { useRadioGroupContext } from './radio-group-context'
import { useRadioGroupItemContext } from './radio-group-item-context'

export type RadioGroupItemTextProps = HTMLArkProps<'span'>

export const RadioGroupItemText: ComponentWithProps<RadioGroupItemTextProps> = defineComponent({
  name: 'RadioGroupItemText',
  setup(_, { slots, attrs }) {
    const api = useRadioGroupContext()
    const itemProps = useRadioGroupItemContext()

    return () => (
      <ark.span {...api.value.getItemTextProps(itemProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.span>
    )
  },
})

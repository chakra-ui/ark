import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'
import { useRadioGroupItemContext } from './use-radio-group-item-context'

export interface RadioGroupItemTextProps extends HTMLArkProps<'span'> {}

export const RadioGroupItemText = defineComponent<RadioGroupItemTextProps>(
  (_, { slots, attrs }) => {
    const api = useRadioGroupContext()
    const itemProps = useRadioGroupItemContext()

    return () => (
      <ark.span {...api.value.getItemTextProps(itemProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.span>
    )
  },
  {
    name: 'RadioGroupItemText',
  },
)

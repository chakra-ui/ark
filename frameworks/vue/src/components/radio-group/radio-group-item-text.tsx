import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'
import { useRadioGroupItemPropsContext } from './use-radio-group-item-props-context'

export interface RadioGroupItemTextProps extends HTMLArkProps<'span'> {}

export const RadioGroupItemText = defineComponent<RadioGroupItemTextProps>(
  (_, { slots, attrs }) => {
    const api = useRadioGroupContext()
    const itemProps = useRadioGroupItemPropsContext()

    return () => (
      <ark.span {...api.value.getItemTextProps(itemProps)} {...attrs}>
        {slots.default?.()}
      </ark.span>
    )
  },
  {
    name: 'RadioGroupItemText',
  },
)

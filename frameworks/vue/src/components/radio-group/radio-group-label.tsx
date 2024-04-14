import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useRadioGroupContext } from './radio-group-context'

export interface RadioGroupLabelProps extends HTMLArkProps<'label'> {}

export const RadioGroupLabel = defineComponent<RadioGroupLabelProps>(
  (_, { slots, attrs }) => {
    const api = useRadioGroupContext()

    return () => (
      <ark.label {...api.value.labelProps} {...attrs}>
        {slots.default?.()}
      </ark.label>
    )
  },
  {
    name: 'RadioGroupLabel',
  },
)

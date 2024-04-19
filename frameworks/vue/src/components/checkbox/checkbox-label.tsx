import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'

export interface CheckboxLabelProps extends HTMLArkProps<'span'> {}

export const CheckboxLabel = defineComponent<CheckboxLabelProps>(
  (_, { attrs, slots }) => {
    const api = useCheckboxContext()

    return () => (
      <ark.span {...api.value.labelProps} {...attrs}>
        {slots.default?.()}
      </ark.span>
    )
  },
  {
    name: 'CheckboxLabel',
  },
)

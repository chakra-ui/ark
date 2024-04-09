import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useCheckboxContext } from './checkbox-context'

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

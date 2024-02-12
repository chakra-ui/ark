import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useCheckboxContext } from './checkbox-context'

export interface CheckboxIndicatorProps extends HTMLArkProps<'div'> {}

export const CheckboxIndicator = defineComponent<CheckboxIndicatorProps>(
  (_, { attrs, slots }) => {
    const api = useCheckboxContext()

    return () => (
      <ark.div {...api.value.indicatorProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'CheckboxIndicator',
  },
)

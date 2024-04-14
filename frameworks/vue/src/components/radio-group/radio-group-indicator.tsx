import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useRadioGroupContext } from './radio-group-context'

export interface RadioGroupIndicatorProps extends HTMLArkProps<'div'> {}

export const RadioGroupIndicator = defineComponent<RadioGroupIndicatorProps>(
  (_, { slots, attrs }) => {
    const api = useRadioGroupContext()

    return () => (
      <ark.div {...api.value.indicatorProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'RadioGroupIndicator',
  },
)

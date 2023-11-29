import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useRadioGroupContext } from './radio-group-context'

export interface RadioGroupIndicatorProps extends HTMLArkProps<'div'> {}

export const RadioGroupIndicator = defineComponent({
  name: 'RadioGroupIndicator',
  setup(_, { slots, attrs }) {
    const api = useRadioGroupContext()

    return () => (
      <ark.div {...api.value.indicatorProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})

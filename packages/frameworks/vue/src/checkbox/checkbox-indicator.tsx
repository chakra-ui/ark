import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { useCheckboxContext } from './checkbox-context'

export interface CheckboxIndicatorProps extends HTMLArkProps<'div'> {}

export const CheckboxIndicator: ComponentWithProps<CheckboxIndicatorProps> = defineComponent({
  name: 'CheckboxIndicator',
  setup(_, { attrs, slots }) {
    const api = useCheckboxContext()

    return () => (
      <ark.div {...api.value.indicatorProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})

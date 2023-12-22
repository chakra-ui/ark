import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export interface SelectIndicatorProps extends HTMLArkProps<'div'> {}

export const SelectIndicator = defineComponent({
  name: 'SelectIndicator',
  setup(_, { slots, attrs }) {
    const api = useSelectContext()

    return () => (
      <ark.div {...api.value.indicatorProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})

import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useSelectContext } from './select-context'

export interface SelectIndicatorProps extends HTMLArkProps<'div'> {}

export const SelectIndicator = defineComponent<SelectIndicatorProps>(
  (_, { slots, attrs }) => {
    const api = useSelectContext()

    return () => (
      <ark.div {...api.value.indicatorProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'SelectIndicator',
  },
)

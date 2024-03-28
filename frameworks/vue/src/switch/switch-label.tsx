import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useSwitchContext } from './switch-context'

export interface SwitchLabelProps extends HTMLArkProps<'span'> {}

export const SwitchLabel = defineComponent<SwitchLabelProps>(
  (_, { slots, attrs }) => {
    const api = useSwitchContext()

    return () => (
      <ark.span {...api.value.labelProps} {...attrs}>
        {slots.default?.()}
      </ark.span>
    )
  },
  {
    name: 'SwitchLabel',
  },
)

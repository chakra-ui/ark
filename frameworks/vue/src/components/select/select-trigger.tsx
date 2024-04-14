import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useSelectContext } from './select-context'

export interface SelectTriggerProps extends HTMLArkProps<'button'> {}

export const SelectTrigger = defineComponent<SelectTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useSelectContext()

    return () => (
      <ark.button {...api.value.triggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'SelectTrigger',
  },
)

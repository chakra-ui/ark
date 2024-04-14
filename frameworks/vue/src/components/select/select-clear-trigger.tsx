import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useSelectContext } from './select-context'

export interface SelectClearTriggerProps extends HTMLArkProps<'button'> {}

export const SelectClearTrigger = defineComponent<SelectClearTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useSelectContext()

    return () => (
      <ark.button {...api.value.clearTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'SelectClearTrigger',
  },
)

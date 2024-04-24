import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useCollapsibleContext } from './use-collapsible-context'

export interface CollapsibleTriggerProps extends HTMLArkProps<'button'> {}

export const CollapsibleTrigger = defineComponent<CollapsibleTriggerProps>(
  (_, { attrs, slots }) => {
    const collapsible = useCollapsibleContext()

    return () => (
      <ark.button {...collapsible.value.triggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'CollapsibleTrigger',
  },
)

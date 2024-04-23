import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useCollapsibleContext } from './use-collapsible-context'

export interface CollapsibleContentProps extends HTMLArkProps<'div'> {}

export const CollapsibleContent = defineComponent<CollapsibleContentProps>(
  (_, { attrs, slots }) => {
    const collapsible = useCollapsibleContext()

    return () =>
      collapsible.value.unmounted ? null : (
        <ark.div {...collapsible.value.contentProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
      )
  },
  {
    name: 'CollapsibleContent',
  },
)

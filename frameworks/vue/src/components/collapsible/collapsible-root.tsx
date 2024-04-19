import { defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { props } from './collapsible.props'
import { type UseCollapsibleProps, useCollapsible } from './use-collapsible'
import { CollapsibleProvider } from './use-collapsible-context'

export type CollapsibleRootEmits = {
  exitComplete: []
}

export interface CollapsibleRootProps extends Assign<HTMLArkProps<'div'>, UseCollapsibleProps> {}

export const CollapsibleRoot = defineComponent<CollapsibleRootProps>(
  (props, { attrs, slots, emit }) => {
    const collapsible = useCollapsible(props, emit)
    CollapsibleProvider(collapsible)

    return () => (
      <ark.div {...collapsible.value.rootProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'CollapsibleRoot',
    props,
  },
)

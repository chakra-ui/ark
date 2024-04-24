import { defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { emits, props } from './toggle-group.props'
import { type UseToggleGroupProps, useToggleGroup } from './use-toggle-group'
import { ToggleGroupProvider } from './use-toggle-group-context'

export interface ToggleGroupRootProps extends Assign<HTMLArkProps<'div'>, UseToggleGroupProps> {}

export const ToggleGroupRoot = defineComponent<ToggleGroupRootProps>(
  (props, { slots, attrs, emit }) => {
    const api = useToggleGroup(props, emit)
    ToggleGroupProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ToggleGroupRoot',
    props,
    emits,
  },
)

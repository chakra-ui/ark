import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { ToggleGroupProvider } from './toggle-group-context'
import { emits, props } from './toggle-group.props'
import { useToggleGroup, type UseToggleGroupProps } from './use-toggle-group'

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

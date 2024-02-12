import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { RadioGroupProvider } from './radio-group-context'
import { emits, props } from './radio-group.props'
import { useRadioGroup, type UseRadioGroupProps } from './use-radio-group'

export interface RadioGroupRootProps extends Assign<HTMLArkProps<'div'>, UseRadioGroupProps> {}

export const RadioGroupRoot = defineComponent<RadioGroupRootProps>(
  (props, { slots, attrs, emit }) => {
    const api = useRadioGroup(props, emit)
    RadioGroupProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'RadioGroupRoot',
    props,
    emits,
  },
)

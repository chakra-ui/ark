import { defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { emits, props } from './radio-group.props'
import { type UseRadioGroupProps, useRadioGroup } from './use-radio-group'
import { RadioGroupProvider } from './use-radio-group-context'

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

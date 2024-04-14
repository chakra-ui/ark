import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { RadioGroupProvider } from './radio-group-context'
import { emits, props } from './radio-group.props'
import { type UseRadioGroupProps, useRadioGroup } from './use-radio-group'

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

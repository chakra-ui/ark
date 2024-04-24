import { defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { emits, props } from './switch.props'
import { type UseSwitchProps, useSwitch } from './use-switch'
import { SwitchProvider } from './use-switch-context'

export interface SwitchRootProps extends Assign<HTMLArkProps<'div'>, UseSwitchProps> {}

export const SwitchRoot = defineComponent<SwitchRootProps>(
  (props, { slots, attrs, emit }) => {
    const api = useSwitch(props, emit)
    SwitchProvider(api)

    return () => (
      <ark.label {...api.value.rootProps} {...attrs}>
        {slots.default?.()}
      </ark.label>
    )
  },
  {
    name: 'SwitchRoot',
    props,
    emits,
  },
)

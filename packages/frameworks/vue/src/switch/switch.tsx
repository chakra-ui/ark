import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { SwitchProvider } from './switch-context'
import { emits, props } from './switch.props'
import { useSwitch, type UseSwitchProps } from './use-switch'

export type SwitchProps = Assign<HTMLArkProps<'div'>, UseSwitchProps>

export const Switch = defineComponent({
  name: 'Switch',
  props,
  emits,
  setup(props, { slots, attrs, emit }) {
    const api = useSwitch(props, emit)
    SwitchProvider(api)

    return () => (
      <ark.label {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.label>
    )
  },
})

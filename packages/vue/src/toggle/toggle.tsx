import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { props } from './toggle.props'
import { useToggle, type UseToggleProps } from './use-toggle'

export type ToggleProps = Assign<HTMLArkProps<'button'>, UseToggleProps>

export const Toggle = defineComponent({
  name: 'Toggle',
  props,
  emits: ['change'],
  setup(props, { slots, attrs, emit }) {
    const api = useToggle(props, emit)

    return () => (
      <ark.button {...api.value.buttonProps} {...attrs}>
        {slots?.default?.()}
      </ark.button>
    )
  },
})

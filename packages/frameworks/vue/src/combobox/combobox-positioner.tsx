import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext, usePresencePropsContext } from '../presence'
import { useComboboxContext } from './combobox-context'

export interface ComboboxPositionerProps extends HTMLArkProps<'div'> {}

export const ComboboxPositioner = defineComponent({
  name: 'ComboboxPositioner',
  setup(_, { slots, attrs }) {
    const api = useComboboxContext()
    const presenceApi = usePresenceContext()
    const presenceProps = usePresencePropsContext()

    if (presenceApi.value.isUnmounted) {
      return () => null
    }

    return () => (
      <ark.ul {...api.value.positionerProps} {...presenceProps} {...attrs}>
        {slots.default?.()}
      </ark.ul>
    )
  },
})

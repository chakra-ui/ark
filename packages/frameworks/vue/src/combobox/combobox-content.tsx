import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext, usePresencePropsContext } from '../presence'
import { emits, props } from '../presence/presence.props'
import { useComboboxContext } from './combobox-context'

export interface ComboboxContentProps extends HTMLArkProps<'div'> {}

export const ComboboxContent = defineComponent({
  name: 'ComboboxContent',
  props,
  emits,
  setup(props, { slots, attrs }) {
    const api = useComboboxContext()
    const presenceApi = usePresenceContext()
    const presenceProps = usePresencePropsContext()

    if (presenceApi.value.isUnmounted) {
      return () => null
    }

    return () => (
      <ark.div {...api.value.contentProps} {...presenceProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})

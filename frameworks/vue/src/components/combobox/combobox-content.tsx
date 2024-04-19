import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { type PresenceProps, usePresenceContext } from '../presence'
import { emits, props } from '../presence/presence.props'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxContentProps extends HTMLArkProps<'div'>, PresenceProps {}

export const ComboboxContent = defineComponent<ComboboxContentProps>(
  (_, { slots, attrs }) => {
    const api = useComboboxContext()
    const presenceApi = usePresenceContext()

    return () =>
      presenceApi.value.isUnmounted ? null : (
        <ark.div {...api.value.contentProps} {...presenceApi.value.presenceProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
      )
  },
  {
    name: 'ComboboxContent',
    props,
    emits,
  },
)

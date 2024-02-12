import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext, type PresenceProps } from '../presence'
import { emits, props } from '../presence/presence.props'
import { useComboboxContext } from './combobox-context'

export interface ComboboxContentProps extends HTMLArkProps<'div'>, PresenceProps {}

export const ComboboxContent = defineComponent<ComboboxContentProps>(
  (_, { slots, attrs }) => {
    const api = useComboboxContext()
    const presenceApi = usePresenceContext()

    return () => (
      <>
        {presenceApi.value.isUnmounted ? null : (
          <ark.div {...api.value.contentProps} {...attrs}>
            {slots.default?.()}
          </ark.div>
        )}
      </>
    )
  },
  {
    name: 'ComboboxContent',
    props,
    emits,
  },
)

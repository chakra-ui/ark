import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, type PresenceProps } from '../presence'
import { emits, props } from '../presence/presence.props'
import { useComboboxContext } from './combobox-context'

export interface ComboboxContentProps extends HTMLArkProps<'div'>, PresenceProps {}

export const ComboboxContent = defineComponent<ComboboxContentProps>(
  (props, { slots, attrs }) => {
    const api = useComboboxContext()

    return () => (
      <Presence {...props} present={props.present !== undefined ? props.present : api.value.isOpen}>
        <ark.div {...api.value.contentProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
      </Presence>
    )
  },
  {
    name: 'ComboboxContent',
    props,
    emits,
  },
)

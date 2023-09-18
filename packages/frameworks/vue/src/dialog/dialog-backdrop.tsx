import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, type PresenceProps } from '../presence'
import { emits, props } from '../presence/presence.props'
import { getValidChildren } from '../utils'
import { useDialogContext } from './dialog-context'

export type DialogBackdropProps = HTMLArkProps<'div'> & PresenceProps

export const DialogBackdrop = defineComponent({
  name: 'DialogBackdrop',
  props,
  emits,
  setup(props, { slots, attrs }) {
    const api = useDialogContext()

    return () => (
      <Presence {...props} present={props.present !== undefined ? props.present : api.value.isOpen}>
        <ark.div {...api.value.backdropProps} {...attrs}>
          {() => getValidChildren(slots)}
        </ark.div>
      </Presence>
    )
  },
})

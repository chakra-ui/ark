import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext, type PresenceProps } from '../presence'
import { emits, props } from '../presence/presence.props'
import { useDialogContext } from './dialog-context'

export interface DialogBackdropProps extends HTMLArkProps<'div'>, PresenceProps {}

export const DialogBackdrop = defineComponent<DialogBackdropProps>(
  (_, { slots, attrs }) => {
    const api = useDialogContext()
    const presenceApi = usePresenceContext()

    return () => (
      <>
        {presenceApi.value.isUnmounted ? null : (
          <ark.div {...api.value.backdropProps} {...attrs}>
            {slots.default?.()}
          </ark.div>
        )}
      </>
    )
  },
  {
    name: 'DialogBackdrop',
    props,
    emits,
  },
)

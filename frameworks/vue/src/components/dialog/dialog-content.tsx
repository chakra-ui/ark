import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { type PresenceProps, usePresenceContext } from '../presence'
import { emits, props } from '../presence/presence.props'
import { useDialogContext } from './dialog-context'

export interface DialogContentProps extends HTMLArkProps<'div'>, PresenceProps {}

export const DialogContent = defineComponent<DialogContentProps>(
  (_, { slots, attrs }) => {
    const api = useDialogContext()
    const presenceApi = usePresenceContext()

    return () => (
      <>
        {presenceApi.value.isUnmounted ? null : (
          <ark.div {...api.value.contentProps} {...presenceApi.value.presenceProps} {...attrs}>
            {slots.default?.()}
          </ark.div>
        )}
      </>
    )
  },
  {
    name: 'DialogContent',
    props,
    emits,
  },
)

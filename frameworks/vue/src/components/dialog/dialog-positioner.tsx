import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { usePresenceContext } from '../presence'
import { useDialogContext } from './dialog-context'

export interface DialogPositionerProps extends HTMLArkProps<'div'> {}

export const DialogPositioner = defineComponent<DialogPositionerProps>(
  (_, { slots, attrs }) => {
    const api = useDialogContext()
    const presenceApi = usePresenceContext()

    return () => (
      <>
        {presenceApi.value.isUnmounted ? null : (
          <ark.div {...api.value.positionerProps} {...attrs}>
            {slots.default?.()}
          </ark.div>
        )}
      </>
    )
  },
  {
    name: 'DialogPositioner',
  },
)

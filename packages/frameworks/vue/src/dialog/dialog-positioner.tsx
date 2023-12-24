import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export interface DialogPositionerProps extends HTMLArkProps<'div'> {}

export const DialogPositioner = defineComponent<DialogPositionerProps>(
  (_, { slots, attrs }) => {
    const api = useDialogContext()

    return () => (
      <ark.div {...api.value.positionerProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'DialogPositioner',
  },
)

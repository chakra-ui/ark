import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { usePinInputContext } from './pin-input-context'

export interface PinInputControlProps extends HTMLArkProps<'div'> {}

export const PinInputControl = defineComponent<PinInputControlProps>(
  (_, { slots, attrs }) => {
    const api = usePinInputContext()

    return () => (
      <ark.div {...api.value.controlProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'PinInputControl',
  },
)

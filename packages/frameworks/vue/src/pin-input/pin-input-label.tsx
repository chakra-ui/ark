import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { usePinInputContext } from './pin-input-context'

export interface PinInputLabelProps extends HTMLArkProps<'label'> {}

export const PinInputLabel = defineComponent<PinInputLabelProps>(
  (_, { slots, attrs }) => {
    const api = usePinInputContext()

    return () => (
      <ark.label {...api.value.labelProps} {...attrs}>
        {slots.default?.()}
      </ark.label>
    )
  },
  {
    name: 'PinInputLabel',
  },
)

import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { usePinInputContext } from './pin-input-context'

export type PinInputControlProps = HTMLArkProps<'div'>

export const PinInputControl: ComponentWithProps<PinInputControlProps> = defineComponent({
  name: 'PinInputControl',
  setup(_, { slots, attrs }) {
    const api = usePinInputContext()

    return () => (
      <ark.div {...api.value.controlProps} {...attrs}>
        <input {...api.value.hiddenInputProps} />
        {slots.default?.()}
      </ark.div>
    )
  },
})

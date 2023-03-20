import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { usePinInputContext } from './pin-input-context'

export type PinInputLabelProps = HTMLArkProps<'label'>

export const PinInputLabel: ComponentWithProps<PinInputLabelProps> = defineComponent({
  name: 'PinInputLabel',
  setup(_, { slots, attrs }) {
    const api = usePinInputContext()
    return () => (
      <ark.label {...api.value.labelProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.label>
    )
  },
})

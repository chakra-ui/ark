import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { usePinInputContext } from './pin-input-context'

export type PinInputHiddenInputProps = HTMLArkProps<'input'>

export const PinInputHiddenInput: ComponentWithProps<PinInputHiddenInputProps> = defineComponent({
  name: 'PinInputHiddenInput',
  setup(_, { attrs }) {
    const api = usePinInputContext()
    return () => <ark.input {...api.value.hiddenInputProps} {...attrs} />
  },
})

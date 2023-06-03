import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useSwitchContext } from './switch-context'

export type SwitchInputProps = HTMLArkProps<'input'>

export const SwitchInput: ComponentWithProps<SwitchInputProps> = defineComponent({
  name: 'SwitchInput',
  setup(_, { attrs }) {
    const api = useSwitchContext()

    return () => <ark.input {...api.value.inputProps} {...attrs} />
  },
})

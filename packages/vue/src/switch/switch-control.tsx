import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useSwitchContext } from './switch-context'

export type SwitchControlProps = HTMLArkProps<'span'>

export const SwitchControl: ComponentWithProps<SwitchControlProps> = defineComponent({
  name: 'SwitchControl',
  setup(_, { slots, attrs }) {
    const api = useSwitchContext()

    return () => (
      <>
        <ark.span {...api.value.controlProps} {...attrs}>
          {slots.default?.()}
        </ark.span>
        <input {...api.value.hiddenInputProps} />
      </>
    )
  },
})

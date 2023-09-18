import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useSwitchContext } from './switch-context'

export type SwitchThumbProps = HTMLArkProps<'span'>

export const SwitchThumb: ComponentWithProps<SwitchThumbProps> = defineComponent({
  name: 'SwitchThumb',
  setup(_, { slots, attrs }) {
    const api = useSwitchContext()

    return () => (
      <ark.span {...api.value.thumbProps} {...attrs}>
        {slots.default?.()}
      </ark.span>
    )
  },
})

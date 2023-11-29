import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useSwitchContext } from './switch-context'

export interface SwitchThumbProps extends HTMLArkProps<'span'> {}

export const SwitchThumb = defineComponent({
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

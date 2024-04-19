import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useSwitchContext } from './use-switch-context'

export interface SwitchThumbProps extends HTMLArkProps<'span'> {}

export const SwitchThumb = defineComponent<SwitchThumbProps>(
  (_, { slots, attrs }) => {
    const api = useSwitchContext()

    return () => (
      <ark.span {...api.value.thumbProps} {...attrs}>
        {slots.default?.()}
      </ark.span>
    )
  },
  {
    name: 'SwitchThumb',
  },
)

import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useAvatarContext } from './avatar-context'

export interface AvatarFallbackProps extends HTMLArkProps<'span'> {}

export const AvatarFallback: ComponentWithProps<AvatarFallbackProps> = defineComponent({
  name: 'AvatarFallback',
  setup(_, { slots, attrs }) {
    const api = useAvatarContext()

    return () => (
      <ark.span {...api.value.fallbackProps} {...attrs}>
        {slots.default?.()}
      </ark.span>
    )
  },
})

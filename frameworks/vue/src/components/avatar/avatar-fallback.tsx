import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useAvatarContext } from './avatar-context'

export interface AvatarFallbackProps extends HTMLArkProps<'span'> {}

export const AvatarFallback = defineComponent<AvatarFallbackProps>(
  (_, { slots, attrs }) => {
    const api = useAvatarContext()

    return () => (
      <ark.span {...api.value.fallbackProps} {...attrs}>
        {slots.default?.()}
      </ark.span>
    )
  },
  {
    name: 'AvatarFallback',
  },
)

import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useAvatarContext } from './use-avatar-context'

export interface AvatarFallbackProps extends HTMLArkProps<'span'> {}

export const AvatarFallback = defineComponent<AvatarFallbackProps>(
  (_, { slots, attrs }) => {
    const avatar = useAvatarContext()

    return () => (
      <ark.span {...avatar.value.fallbackProps} {...attrs}>
        {slots.default?.()}
      </ark.span>
    )
  },
  {
    name: 'AvatarFallback',
  },
)

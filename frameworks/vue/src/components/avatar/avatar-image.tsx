import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useAvatarContext } from './use-avatar-context'

export interface AvatarImageProps extends HTMLArkProps<'img'> {}

export const AvatarImage = defineComponent<AvatarImageProps>(
  (_, { attrs }) => {
    const avatar = useAvatarContext()

    return () => <ark.img {...avatar.value.imageProps} {...attrs} />
  },
  {
    name: 'AvatarImage',
  },
)

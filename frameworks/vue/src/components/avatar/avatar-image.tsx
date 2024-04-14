import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useAvatarContext } from './avatar-context'

export interface AvatarImageProps extends HTMLArkProps<'img'> {}

export const AvatarImage = defineComponent<AvatarImageProps>(
  (_, { attrs }) => {
    const api = useAvatarContext()
    return () => <ark.img {...api.value.imageProps} {...attrs} />
  },
  {
    name: 'AvatarImage',
  },
)

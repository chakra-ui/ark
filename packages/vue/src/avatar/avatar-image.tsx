import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useAvatarContext } from './avatar-context'

export type AvatarImageProps = HTMLArkProps<'img'>

export const AvatarImage: ComponentWithProps<AvatarImageProps> = defineComponent({
  name: 'AvatarImage',
  setup(_, { attrs }) {
    const api = useAvatarContext()

    return () => <ark.img {...api.value.imageProps} {...attrs} />
  },
})

import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useAvatarContext } from './avatar-context'

export type AvatarImageProps = HTMLArkProps<'img'>

export const AvatarImage = (props: AvatarImageProps) => {
  const avatar = useAvatarContext()
  const imageProps = mergeProps(() => avatar().imageProps, props)
  return <ark.img {...imageProps} />
}

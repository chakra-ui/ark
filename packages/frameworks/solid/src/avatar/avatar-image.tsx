import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useAvatarContext } from './avatar-context'

export interface AvatarImageProps extends HTMLArkProps<'img'> {}

export const AvatarImage = (props: AvatarImageProps) => {
  const avatar = useAvatarContext()
  const imageProps = mergeProps(() => avatar().imageProps, props)
  return <ark.img {...imageProps} />
}

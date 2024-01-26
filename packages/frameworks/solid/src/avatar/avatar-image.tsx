import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useAvatarContext } from './avatar-context'

export interface AvatarImageProps extends HTMLArkProps<'img'> {}

export const AvatarImage: ArkComponent<'img'> = (props: AvatarImageProps) => {
  const avatar = useAvatarContext()
  const mergedProps = mergeProps(() => avatar().imageProps, props)

  return <ark.img {...mergedProps} />
}

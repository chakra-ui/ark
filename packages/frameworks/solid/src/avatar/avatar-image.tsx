import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useAvatarContext } from './use-avatar-context'

export interface AvatarImageProps extends HTMLArkProps<'img'> {}

export const AvatarImage: ArkComponent<'img'> = (props: AvatarImageProps) => {
  const context = useAvatarContext()
  const mergedProps = mergeProps(() => context().imageProps, props)

  return <ark.img {...mergedProps} />
}

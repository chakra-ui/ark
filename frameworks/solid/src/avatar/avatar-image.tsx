import { ark, type HTMLArkProps } from '../factory'
import { mergeProps } from '../merge-props'
import { useAvatarContext } from './use-avatar-context'

export interface AvatarImageProps extends HTMLArkProps<'img'> {}

export const AvatarImage = (props: AvatarImageProps) => {
  const context = useAvatarContext()
  const mergedProps = mergeProps(() => context().imageProps, props)
  return <ark.img {...mergedProps} />
}

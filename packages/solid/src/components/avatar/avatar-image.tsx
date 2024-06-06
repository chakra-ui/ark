import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useAvatarContext } from './use-avatar-context'

export interface AvatarImageProps extends HTMLArkProps<'img'> {}

export const AvatarImage = (props: AvatarImageProps) => {
  const context = useAvatarContext()
  const mergedProps = mergeProps(() => context().getImageProps(), props)
  return <ark.img {...mergedProps} />
}

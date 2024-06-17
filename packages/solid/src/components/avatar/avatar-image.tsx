import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useAvatarContext } from './use-avatar-context'

export interface AvatarImageBaseProps extends PolymorphicProps<'img'> {}
export interface AvatarImageProps
  extends JSX.ImgHTMLAttributes<HTMLImageElement>,
    AvatarImageBaseProps {}

export const AvatarImage = (props: AvatarImageProps) => {
  const context = useAvatarContext()
  const mergedProps = mergeProps(() => context().getImageProps(), props)
  return <ark.img {...mergedProps} />
}

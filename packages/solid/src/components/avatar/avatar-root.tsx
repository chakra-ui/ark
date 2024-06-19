import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseAvatarProps, useAvatar } from './use-avatar'
import { AvatarProvider } from './use-avatar-context'

export interface AvatarRootBaseProps extends UseAvatarProps, PolymorphicProps<'div'> {}
export interface AvatarRootProps extends HTMLProps<'div'>, AvatarRootBaseProps {}

export const AvatarRoot = (props: AvatarRootProps) => {
  const [useAvatarProps, localProps] = createSplitProps<UseAvatarProps>()(props, [
    'id',
    'ids',
    'onStatusChange',
  ])

  const context = useAvatar(useAvatarProps)
  const mergedProps = mergeProps(() => context().getRootProps(), localProps)

  return (
    <AvatarProvider value={context}>
      <ark.div {...mergedProps} />
    </AvatarProvider>
  )
}

import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useAvatar, type UseAvatarProps } from './use-avatar'
import { AvatarProvider } from './use-avatar-context'

export interface AvatarRootProps extends Assign<HTMLArkProps<'div'>, UseAvatarProps> {}

export const AvatarRoot: ArkComponent<'div', UseAvatarProps> = (props: AvatarRootProps) => {
  const [useAvatarProps, localProps] = createSplitProps<UseAvatarProps>()(props, [
    'dir',
    'getRootNode',
    'id',
    'onLoadingStatusChange',
  ])

  const context = useAvatar(useAvatarProps)
  const mergedProps = mergeProps(() => context().rootProps, localProps)

  return (
    <AvatarProvider value={context}>
      <ark.div {...mergedProps} />
    </AvatarProvider>
  )
}

import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { AvatarProvider } from './avatar-context'
import { useAvatar, type UseAvatarProps } from './use-avatar'

export interface AvatarRootProps extends Assign<HTMLArkProps<'div'>, UseAvatarProps> {}

export const AvatarRoot = (props: AvatarRootProps) => {
  const [params, localProps] = createSplitProps<UseAvatarProps>()(props, [
    'dir',
    'getRootNode',
    'id',
    'onLoadingStatusChange',
  ])

  const api = useAvatar(params)
  const mergedProps = mergeProps(() => api().rootProps, localProps)

  return (
    <AvatarProvider value={api}>
      <ark.div {...mergedProps} />
    </AvatarProvider>
  )
}

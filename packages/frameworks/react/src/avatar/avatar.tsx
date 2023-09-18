import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { AvatarProvider } from './avatar-context'
import { useAvatar, type UseAvatarProps } from './use-avatar'

export type AvatarProps = Assign<HTMLArkProps<'div'>, UseAvatarProps>

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const [useAvatarProps, localProps] = createSplitProps<UseAvatarProps>()(props, [
    'getRootNode',
    'id',
    'onLoadingStatusChange',
  ])
  const avatar = useAvatar(useAvatarProps)
  const mergedProps = mergeProps(avatar.rootProps, localProps)

  return (
    <AvatarProvider value={avatar}>
      <ark.div {...mergedProps} ref={ref} />
    </AvatarProvider>
  )
})

Avatar.displayName = 'Avatar'

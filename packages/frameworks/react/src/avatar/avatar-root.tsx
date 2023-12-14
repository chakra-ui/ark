'use client'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { AvatarProvider } from './avatar-context'
import { useAvatar, type UseAvatarProps } from './use-avatar'

export interface AvatarRootProps extends Assign<HTMLArkProps<'div'>, UseAvatarProps> {}

export const AvatarRoot = forwardRef<HTMLDivElement, AvatarRootProps>((props, ref) => {
  const [useAvatarProps, localProps] = createSplitProps<UseAvatarProps>()(props, [
    'dir',
    'getRootNode',
    'id',
    'onLoadingStatusChange',
  ])
  const api = useAvatar(useAvatarProps)
  const mergedProps = mergeProps(api.rootProps, localProps)

  return (
    <AvatarProvider value={api}>
      <ark.div {...mergedProps} ref={ref} />
    </AvatarProvider>
  )
})

AvatarRoot.displayName = 'AvatarRoot'

import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { AvatarProvider } from './avatar-context'
import { useAvatar, type UseAvatarProps, type UseAvatarReturn } from './use-avatar'

export type AvatarProps = Assign<
  HTMLArkProps<'div'>,
  UseAvatarProps & {
    children: ReactNode | ((pages: UseAvatarReturn) => ReactNode)
  }
>

export const Avatar = forwardRef<'div', AvatarProps>((props, ref) => {
  const [useAvatarProps, { children, ...localProps }] = createSplitProps<UseAvatarProps>()(props, [
    'getRootNode',
    'id',
    'onError',
    'onLoad',
  ])
  const avatar = useAvatar(useAvatarProps)
  const mergedProps = mergeProps(avatar.rootProps, localProps)
  const view = runIfFn(children, avatar)

  return (
    <AvatarProvider value={avatar}>
      <ark.div {...mergedProps} ref={ref}>
        {view}
      </ark.div>
    </AvatarProvider>
  )
})

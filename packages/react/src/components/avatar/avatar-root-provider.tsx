import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseAvatarReturn } from './use-avatar'
import { AvatarProvider } from './use-avatar-context'

interface RootProviderProps {
  value: UseAvatarReturn
}

export interface AvatarRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface AvatarRootProviderProps extends HTMLProps<'div'>, AvatarRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const AvatarRootProvider = forwardRef<HTMLDivElement, AvatarRootProviderProps>((props, ref) => {
  const [{ value: avatar }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(avatar.getRootProps(), localProps)

  return (
    <AvatarProvider value={avatar}>
      <ark.div {...mergedProps} ref={ref} />
    </AvatarProvider>
  )
})

AvatarRootProvider.displayName = 'AvatarRootProvider'

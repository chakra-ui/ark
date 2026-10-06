'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseAvatarReturn } from './use-avatar.ts'
import { AvatarProvider } from './use-avatar-context.ts'

interface RootProviderProps {
  value: UseAvatarReturn
}

export interface AvatarRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface AvatarRootProviderProps extends HTMLProps<'span'>, AvatarRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const AvatarRootProvider = forwardRef<HTMLSpanElement, AvatarRootProviderProps>((props, ref) => {
  const [{ value: avatar }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(avatar.getRootProps(), localProps)

  return (
    <AvatarProvider value={avatar}>
      <ark.span {...mergedProps} ref={ref} />
    </AvatarProvider>
  )
})

AvatarRootProvider.displayName = 'AvatarRootProvider'

'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseClipboardReturn } from './use-clipboard.ts'
import { ClipboardProvider } from './use-clipboard-context.ts'

interface RootProviderProps {
  value: UseClipboardReturn
}

export interface ClipboardRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface ClipboardRootProviderProps extends HTMLProps<'div'>, ClipboardRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const ClipboardRootProvider = forwardRef<HTMLDivElement, ClipboardRootProviderProps>((props, ref) => {
  const [{ value: clipboard }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(clipboard.getRootProps(), localProps)

  return (
    <ClipboardProvider value={clipboard}>
      <ark.div ref={ref} {...mergedProps} />
    </ClipboardProvider>
  )
})

ClipboardRootProvider.displayName = 'ClipboardRootProvider'

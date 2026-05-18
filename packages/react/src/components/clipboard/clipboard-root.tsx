'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { type UseClipboardProps, useClipboard } from './use-clipboard.ts'
import { ClipboardProvider } from './use-clipboard-context.ts'

export interface ClipboardRootBaseProps extends UseClipboardProps, PolymorphicProps {}
export interface ClipboardRootProps extends Assign<HTMLProps<'div'>, ClipboardRootBaseProps> {}

const splitRootProps = createSplitProps<UseClipboardProps>()

export const ClipboardRoot = forwardRef<HTMLDivElement, ClipboardRootProps>((props, ref) => {
  const [useClipboardProps, localProps] = splitRootProps(props, [
    'defaultValue',
    'id',
    'ids',
    'onStatusChange',
    'onValueChange',
    'timeout',
    'translations',
    'value',
  ])
  const clipboard = useClipboard(useClipboardProps)
  const mergedProps = mergeProps(clipboard.getRootProps(), localProps)

  return (
    <ClipboardProvider value={clipboard}>
      <ark.div ref={ref} {...mergedProps} />
    </ClipboardProvider>
  )
})

ClipboardRoot.displayName = 'ClipboardRoot'

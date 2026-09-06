'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useComposedRefs } from '../../utils/compose-refs.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseWindowVirtualizerReturn } from './use-window-virtualizer.ts'
import { WindowVirtualizerProvider } from './use-window-virtualizer-context.ts'

interface RootProps {
  /**
   * The virtualizer instance returned by `useWindowVirtualizer`.
   */
  value: UseWindowVirtualizerReturn
}

export interface WindowVirtualizerRootBaseProps extends RootProps, PolymorphicProps {}

export interface WindowVirtualizerRootProps extends HTMLProps<'div'>, WindowVirtualizerRootBaseProps {}

const splitRootProps = createSplitProps<RootProps>()

export const WindowVirtualizerRoot = forwardRef<HTMLDivElement, WindowVirtualizerRootProps>((props, ref) => {
  const [{ value: virtualizer }, localProps] = splitRootProps(props, ['value'])
  const composedRef = useComposedRefs(virtualizer.ref, ref)
  const mergedProps = mergeProps(
    { ...virtualizer.getContainerAriaAttrs(), style: virtualizer.getContainerStyle() },
    localProps,
  )

  return (
    <WindowVirtualizerProvider value={virtualizer}>
      <ark.div {...mergedProps} ref={composedRef} />
    </WindowVirtualizerProvider>
  )
})

WindowVirtualizerRoot.displayName = 'WindowVirtualizerRoot'

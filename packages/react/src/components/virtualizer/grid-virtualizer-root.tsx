'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useComposedRefs } from '../../utils/compose-refs.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseGridVirtualizerReturn } from './use-grid-virtualizer.ts'
import { GridVirtualizerProvider } from './use-grid-virtualizer-context.ts'

interface RootProps {
  /**
   * The virtualizer instance returned by `useGridVirtualizer`.
   */
  value: UseGridVirtualizerReturn
}

export interface GridVirtualizerRootBaseProps extends RootProps, PolymorphicProps {}

export interface GridVirtualizerRootProps extends HTMLProps<'div'>, GridVirtualizerRootBaseProps {}

const splitRootProps = createSplitProps<RootProps>()

export const GridVirtualizerRoot = forwardRef<HTMLDivElement, GridVirtualizerRootProps>((props, ref) => {
  const [{ value: virtualizer }, localProps] = splitRootProps(props, ['value'])
  const composedRef = useComposedRefs(virtualizer.ref, ref)
  const mergedProps = mergeProps(
    { ...virtualizer.getContainerAriaAttrs(), style: virtualizer.getContainerStyle() },
    localProps,
  )

  return (
    <GridVirtualizerProvider value={virtualizer}>
      <ark.div
        {...mergedProps}
        ref={composedRef}
        onScroll={(event) => {
          virtualizer.getScrollHandler()(event)
          localProps.onScroll?.(event)
        }}
      />
    </GridVirtualizerProvider>
  )
})

GridVirtualizerRoot.displayName = 'GridVirtualizerRoot'

'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useComposedRefs } from '../../utils/compose-refs.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseListVirtualizerReturn } from './use-list-virtualizer.ts'
import { ListVirtualizerProvider } from './use-list-virtualizer-context.ts'

interface RootProps {
  /**
   * The virtualizer instance returned by `useListVirtualizer`.
   */
  value: UseListVirtualizerReturn
}

export interface ListVirtualizerRootBaseProps extends RootProps, PolymorphicProps {}

export interface ListVirtualizerRootProps extends HTMLProps<'div'>, ListVirtualizerRootBaseProps {}

const splitRootProps = createSplitProps<RootProps>()

export const ListVirtualizerRoot = forwardRef<HTMLDivElement, ListVirtualizerRootProps>((props, ref) => {
  const [{ value: virtualizer }, localProps] = splitRootProps(props, ['value'])
  const composedRef = useComposedRefs(virtualizer.ref, ref)
  const mergedProps = mergeProps(
    { ...virtualizer.getContainerAriaAttrs(), style: virtualizer.getContainerStyle() },
    localProps,
  )

  return (
    <ListVirtualizerProvider value={virtualizer}>
      <ark.div
        {...mergedProps}
        ref={composedRef}
        onScroll={(event) => {
          virtualizer.getScrollHandler()(event)
          localProps.onScroll?.(event)
        }}
      />
    </ListVirtualizerProvider>
  )
})

ListVirtualizerRoot.displayName = 'ListVirtualizerRoot'

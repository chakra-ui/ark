'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { type UseSplitterProps, useSplitter } from './use-splitter.ts'
import { SplitterProvider } from './use-splitter-context.ts'

export interface SplitterRootBaseProps extends UseSplitterProps, PolymorphicProps {}
export interface SplitterRootProps extends Assign<HTMLProps<'div'>, SplitterRootBaseProps> {}

const splitRootProps = createSplitProps<UseSplitterProps>()

export const SplitterRoot = forwardRef<HTMLDivElement, SplitterRootProps>((props, ref) => {
  const [useSplitterProps, localProps] = splitRootProps(props, [
    'defaultSize',
    'id',
    'ids',
    'keyboardResizeBy',
    'nonce',
    'onCollapse',
    'onExpand',
    'onResize',
    'onResizeEnd',
    'onResizeStart',
    'orientation',
    'panels',
    'registry',
    'size',
  ])
  const splitter = useSplitter(useSplitterProps)
  const mergedProps = mergeProps(splitter.getRootProps(), localProps)

  return (
    <SplitterProvider value={splitter}>
      <ark.div {...mergedProps} ref={ref} />
    </SplitterProvider>
  )
})

SplitterRoot.displayName = 'SplitterRoot'

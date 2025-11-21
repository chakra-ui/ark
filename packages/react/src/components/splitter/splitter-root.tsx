import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseSplitterProps, useSplitter } from './use-splitter'
import { SplitterProvider } from './use-splitter-context'

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

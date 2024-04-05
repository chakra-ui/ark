import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSplitter, type UseSplitterProps } from './use-splitter'
import { SplitterProvider } from './use-splitter-context'

export interface SplitterRootProps extends Assign<HTMLArkProps<'div'>, UseSplitterProps> {}

export const SplitterRoot = forwardRef<HTMLDivElement, SplitterRootProps>((props, ref) => {
  const [useSplitterProps, localProps] = createSplitProps<UseSplitterProps>()(props, [
    'defaultSize',
    'dir',
    'getRootNode',
    'id',
    'ids',
    'onSizeChange',
    'onSizeChangeEnd',
    'orientation',
    'size',
  ])
  const splitter = useSplitter(useSplitterProps)
  const mergedProps = mergeProps(splitter.rootProps, localProps)

  return (
    <SplitterProvider value={splitter}>
      <ark.div {...mergedProps} ref={ref} />
    </SplitterProvider>
  )
})

SplitterRoot.displayName = 'SplitterRoot'

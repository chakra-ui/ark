import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { SplitterProvider } from './splitter-context'
import { useSplitter, type UseSplitterProps } from './use-splitter'

export type SplitterProps = HTMLArkProps<'div', UseSplitterProps>

export const Splitter = forwardRef<'div', UseSplitterProps>((props, ref) => {
  const [useSplitterProps, divProps] = createSplitProps<UseSplitterProps>()(props, [
    'dir',
    'getRootNode',
    'id',
    'ids',
    'onResize',
    'onResizeEnd',
    'onResizeStart',
    'orientation',
    'size',
  ])
  const splitter = useSplitter(useSplitterProps)
  const mergedProps = mergeProps(splitter.rootProps, divProps)

  return (
    <SplitterProvider value={splitter}>
      <ark.div {...mergedProps} ref={ref} />
    </SplitterProvider>
  )
})

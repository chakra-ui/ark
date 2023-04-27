import { type Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { SplitterProvider } from './splitter-context'
import { useSplitter, type UseSplitterProps } from './use-splitter'

export type SplitterProps = Assign<HTMLArkProps<'div'>, UseSplitterProps>

export const Splitter = (props: SplitterProps) => {
  const [useSplitterProps, divProps] = createSplitProps<UseSplitterProps>()(props, [
    'dir',
    'getRootNode',
    'id',
    'onResize',
    'onResizeEnd',
    'onResizeStart',
    'orientation',
    'size',
  ])
  const splitter = useSplitter(useSplitterProps)

  return (
    <SplitterProvider value={splitter}>
      <ark.div {...splitter().rootProps} {...divProps} />
    </SplitterProvider>
  )
}

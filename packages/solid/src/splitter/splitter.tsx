import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { SplitterProvider } from './splitter-context'
import { useSplitter, type UseSplitterProps } from './use-splitter'

export type SplitterProps = Assign<HTMLArkProps<'div'>, UseSplitterProps>

export const Splitter = (props: SplitterProps) => {
  const [splitterParams, divProps] = createSplitProps<UseSplitterProps>()(props, [
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

  const api = useSplitter(splitterParams)
  const rootProps = mergeProps(() => api().rootProps, divProps)

  return (
    <SplitterProvider value={api}>
      <ark.div {...rootProps} />
    </SplitterProvider>
  )
}

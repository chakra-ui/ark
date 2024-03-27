import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSplitter, type UseSplitterProps } from './use-splitter'
import { SplitterProvider } from './use-splitter-context'

export interface SplitterRootProps extends Assign<HTMLArkProps<'div'>, UseSplitterProps> {}

export const SplitterRoot = (props: SplitterRootProps) => {
  const [splitterParams, localProps] = createSplitProps<UseSplitterProps>()(props, [
    'dir',
    'getRootNode',
    'id',
    'ids',
    'onSizeChange',
    'onSizeChangeEnd',
    'orientation',
    'size',
  ])
  const api = useSplitter(splitterParams)
  const mergedProps = mergeProps(() => api().rootProps, localProps)

  return (
    <SplitterProvider value={api}>
      <ark.div {...mergedProps} />
    </SplitterProvider>
  )
}

import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { createSplitProps } from '~/utils/create-split-props'
import { type UseSplitterProps, useSplitter } from './use-splitter'
import { SplitterProvider } from './use-splitter-context'

export interface SplitterRootProps extends Assign<HTMLArkProps<'div'>, UseSplitterProps> {}

export const SplitterRoot = (props: SplitterRootProps) => {
  const [useSplitterProps, localProps] = createSplitProps<UseSplitterProps>()(props, [
    'dir',
    'getRootNode',
    'id',
    'ids',
    'onSizeChange',
    'onSizeChangeEnd',
    'orientation',
    'size',
  ])
  const api = useSplitter(useSplitterProps)
  const mergedProps = mergeProps(() => api().rootProps, localProps)

  return (
    <SplitterProvider value={api}>
      <ark.div {...mergedProps} />
    </SplitterProvider>
  )
}

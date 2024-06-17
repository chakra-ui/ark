import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseSplitterProps, useSplitter } from './use-splitter'
import { SplitterProvider } from './use-splitter-context'

export interface SplitterRootBaseProps extends UseSplitterProps, PolymorphicProps<'div'> {}
export interface SplitterRootProps extends HTMLProps<'div'>, SplitterRootBaseProps {}

export const SplitterRoot = (props: SplitterRootProps) => {
  const [useSplitterProps, localProps] = createSplitProps<UseSplitterProps>()(props, [
    'defaultSize',
    'id',
    'ids',
    'onSizeChange',
    'onSizeChangeEnd',
    'orientation',
    'size',
  ])
  const api = useSplitter(useSplitterProps)
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <SplitterProvider value={api}>
      <ark.div {...mergedProps} />
    </SplitterProvider>
  )
}

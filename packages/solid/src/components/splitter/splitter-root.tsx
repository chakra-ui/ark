import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { type UseSplitterProps, useSplitter } from './use-splitter.ts'
import { SplitterProvider } from './use-splitter-context.ts'

export interface SplitterRootBaseProps extends UseSplitterProps, PolymorphicProps<'div'> {}
export interface SplitterRootProps extends Assign<HTMLProps<'div'>, SplitterRootBaseProps> {}

export const SplitterRoot = (props: SplitterRootProps) => {
  const [useSplitterProps, localProps] = createSplitProps<UseSplitterProps>()(props, [
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
    'registry',
  ])
  const api = useSplitter(useSplitterProps)
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <SplitterProvider value={api}>
      <ark.div {...mergedProps} />
    </SplitterProvider>
  )
}

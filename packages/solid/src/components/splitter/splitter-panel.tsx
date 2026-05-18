import { mergeProps } from '@zag-js/solid'
import type { PanelProps } from '@zag-js/splitter'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useSplitterContext } from './use-splitter-context.ts'

export interface SplitterPanelBaseProps extends PanelProps, PolymorphicProps<'div'> {}
export interface SplitterPanelProps extends Assign<HTMLProps<'div'>, SplitterPanelBaseProps> {}

export const SplitterPanel = (props: SplitterPanelProps) => {
  const [panelProps, restProps] = createSplitProps<PanelProps>()(props, ['id'])
  const api = useSplitterContext()
  const mergedProps = mergeProps(() => api().getPanelProps(panelProps), restProps)

  return <ark.div {...mergedProps} />
}

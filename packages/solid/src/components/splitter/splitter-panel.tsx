import { mergeProps } from '@zag-js/solid'
import type { PanelProps } from '@zag-js/splitter'
import type { JSX } from 'solid-js'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useSplitterContext } from './use-splitter-context'

export interface SplitterPanelBaseProps extends PanelProps, PolymorphicProps<'div'> {}
export interface SplitterPanelProps
  extends Assign<JSX.HTMLAttributes<HTMLDivElement>, SplitterPanelBaseProps> {}

export const SplitterPanel = (props: SplitterPanelProps) => {
  const [panelProps, restProps] = createSplitProps<PanelProps>()(props, ['id', 'snapSize'])
  const api = useSplitterContext()
  const mergedProps = mergeProps(() => api().getPanelProps(panelProps), restProps)

  return <ark.div {...mergedProps} />
}

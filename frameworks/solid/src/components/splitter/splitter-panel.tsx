import { mergeProps } from '@zag-js/solid'
import type { PanelProps } from '@zag-js/splitter'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { createSplitProps } from '~/utils/create-split-props'
import { useSplitterContext } from './use-splitter-context'

export interface SplitterPanelProps extends Assign<HTMLArkProps<'div'>, PanelProps> {}

export const SplitterPanel = (props: SplitterPanelProps) => {
  const [panelProps, restProps] = createSplitProps<PanelProps>()(props, ['id', 'snapSize'])
  const api = useSplitterContext()
  const mergedProps = mergeProps(() => api().getPanelProps(panelProps), restProps)

  return <ark.div {...mergedProps} />
}

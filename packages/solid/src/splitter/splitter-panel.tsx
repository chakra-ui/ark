import { mergeProps } from '@zag-js/solid'
import { type connect } from '@zag-js/splitter'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSplitterContext } from './splitter-context'

type PanelParams = Parameters<ReturnType<typeof connect>['getPanelProps']>[0]

export type SplitterPanelProps = Assign<HTMLArkProps<'div'>, PanelParams>

export const SplitterPanel = (props: SplitterPanelProps) => {
  const [panelParams, restProps] = createSplitProps<PanelParams>()(props, ['id', 'snapSize'])

  const api = useSplitterContext()
  const panelProps = mergeProps(() => api().getPanelProps(panelParams), restProps)

  return <ark.div {...panelProps} />
}

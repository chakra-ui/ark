import { mergeProps } from '@zag-js/solid'
import { type connect } from '@zag-js/splitter'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSplitterContext } from './splitter-context'

type PanelParams = Parameters<ReturnType<typeof connect>['getPanelProps']>[0]

export interface SplitterPanelProps extends Assign<HTMLArkProps<'div'>, PanelParams> {}

export const SplitterPanel: ArkComponent<'div', PanelParams> = (props: SplitterPanelProps) => {
  const [panelParams, restProps] = createSplitProps<PanelParams>()(props, ['id', 'snapSize'])

  const api = useSplitterContext()
  const mergedProps = mergeProps(() => api().getPanelProps(panelParams), restProps)

  return <ark.div {...mergedProps} />
}

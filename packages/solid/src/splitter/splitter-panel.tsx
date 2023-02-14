import type { Assign } from '@polymorphic-factory/solid'
import type { connect } from '@zag-js/splitter'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { useSplitterContext } from './splitter-context'

type GetPanelProps = Parameters<ReturnType<typeof connect>['getPanelProps']>[0]

export type SplitterPanelProps = Assign<HTMLArkProps<'div'>, GetPanelProps>

export const SplitterPanel = (props: SplitterPanelProps) => {
  const [splitterPanelProps, divProps] = createSplitProps<GetPanelProps>()(props, [
    'id',
    'snapSize',
  ])
  const splitter = useSplitterContext()

  return <ark.div {...splitter().getPanelProps(splitterPanelProps)} {...divProps} />
}

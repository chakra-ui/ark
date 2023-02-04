import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import type { connect } from '@zag-js/splitter'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSplitterContext } from './splitter-context'

type GetPanelProps = Parameters<ReturnType<typeof connect>['getPanelProps']>[0]

export type SplitterPanelProps = Assign<HTMLArkProps<'div'>, GetPanelProps>

export const SplitterPanel = forwardRef<'div', SplitterPanelProps>((props, ref) => {
  const [splitterPanelProps, divProps] = createSplitProps<GetPanelProps>()(props, [
    'id',
    'snapSize',
  ])
  const { getPanelProps } = useSplitterContext()
  const mergedProps = mergeProps(getPanelProps(splitterPanelProps), divProps)

  return <ark.div {...mergedProps} ref={ref} />
})

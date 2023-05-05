import { mergeProps } from '@zag-js/react'
import { type PanelProps } from '@zag-js/splitter'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { useSplitterContext } from './splitter-context'

export type SplitterPanelProps = Assign<HTMLArkProps<'div'>, PanelProps>

export const SplitterPanel = forwardRef<'div', PanelProps>((props, ref) => {
  const [splitterPanelProps, divProps] = createSplitProps<PanelProps>()(props, ['id', 'snapSize'])
  const { getPanelProps } = useSplitterContext()
  const mergedProps = mergeProps(getPanelProps(splitterPanelProps), divProps)

  return <ark.div {...mergedProps} ref={ref} />
})

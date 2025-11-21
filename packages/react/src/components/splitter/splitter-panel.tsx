import { mergeProps } from '@zag-js/react'
import type { PanelProps } from '@zag-js/splitter'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSplitterContext } from './use-splitter-context'

export interface SplitterPanelBaseProps extends PanelProps, PolymorphicProps {}
export interface SplitterPanelProps extends Assign<HTMLProps<'div'>, SplitterPanelBaseProps> {}

const splitPanelProps = createSplitProps<PanelProps>()

export const SplitterPanel = forwardRef<HTMLDivElement, SplitterPanelProps>((props, ref) => {
  const [splitterPanelProps, localProps] = splitPanelProps(props, ['id'])
  const splitter = useSplitterContext()
  const mergedProps = mergeProps(splitter.getPanelProps(splitterPanelProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

SplitterPanel.displayName = 'SplitterPanel'

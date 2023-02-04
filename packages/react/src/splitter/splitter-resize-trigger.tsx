import type { connect } from '@zag-js/splitter'
import { Children, cloneElement, ReactElement } from 'react'
import type { Assign } from '../types'
import { useSplitterContext } from './splitter-context'

type SplitterContext = Parameters<ReturnType<typeof connect>['getResizeTriggerProps']>[0]
export type SplitterResizeTriggerProps = Assign<{ children: ReactElement }, SplitterContext>

export const SplitterResizeTrigger = (props: SplitterResizeTriggerProps) => {
  const { children, ...tabProps } = props
  const { getResizeTriggerProps } = useSplitterContext()

  const onlyChild = Children.only(children)
  return cloneElement(onlyChild, getResizeTriggerProps(tabProps))
}

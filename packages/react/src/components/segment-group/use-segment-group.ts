import * as segmentGroup from '@zag-js/radio-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseSegmentGroupProps
  extends Optional<Omit<segmentGroup.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial value of the segment group when it is first rendered.
   * Use when you do not need to control the state of the segment group.
   */
  defaultValue?: segmentGroup.Context['value']
}

export interface UseSegmentGroupReturn extends segmentGroup.Api<PropTypes> {}

export const useSegmentGroup = (props: UseSegmentGroupProps = {}): UseSegmentGroupReturn => {
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const initialContext: segmentGroup.Context = {
    id: useId(),
    dir,
    getRootNode,
    value: props.defaultValue,
    ...props,
  }

  const context: segmentGroup.Context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
  }

  const [state, send] = useMachine(segmentGroup.machine(initialContext), {
    context,
  })

  return segmentGroup.connect(state, send, normalizeProps)
}

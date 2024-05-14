import * as segmentGroup from '@zag-js/radio-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseSegmentGroupProps
  extends Optional<Omit<segmentGroup.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial value of the segment group when it is first rendered.
   * Use when you do not need to control the state of the segment group.
   */
  defaultValue?: segmentGroup.Context['value']
}
export interface UseSegmentGroupReturn extends Accessor<segmentGroup.Api<PropTypes>> {}

export const useSegmentGroup = (props: UseSegmentGroupProps): UseSegmentGroupReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    value: props.defaultValue,
    ...props,
  }))
  const [state, send] = useMachine(segmentGroup.machine(context()), { context })

  return createMemo(() => segmentGroup.connect(state, send, normalizeProps))
}

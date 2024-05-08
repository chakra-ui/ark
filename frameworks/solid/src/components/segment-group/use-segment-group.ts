import * as segment from '@zag-js/radio-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseSegmentGroupProps
  extends Optional<Omit<segment.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseSegmentGroupReturn extends Accessor<segment.Api<PropTypes>> {}

export const useSegmentGroup = (props: UseSegmentGroupProps): UseSegmentGroupReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...props,
  }))
  const [state, send] = useMachine(segment.machine(context()), { context })

  return createMemo(() => segment.connect(state, send, normalizeProps))
}

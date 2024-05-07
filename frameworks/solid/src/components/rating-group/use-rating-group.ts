import * as rating from '@zag-js/rating-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseRatingGroupProps
  extends Optional<Omit<rating.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseRatingGroupReturn extends Accessor<rating.Api<PropTypes>> {}

export const useRatingGroup = (props: UseRatingGroupProps): UseRatingGroupReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const context = createMemo(() => ({
    id: createUniqueId(),
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...props,
  }))

  const [state, send] = useMachine(rating.machine(context()), { context })

  return createMemo(() => rating.connect(state, send, normalizeProps))
}

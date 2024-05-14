import * as rating from '@zag-js/rating-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseRatingGroupProps
  extends Optional<Omit<rating.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial value of the rating group when it is first rendered.
   * Use when you do not need to control the state of the rating group.
   */
  defaultValue?: rating.Context['value']
}
export interface UseRatingGroupReturn extends Accessor<rating.Api<PropTypes>> {}

export const useRatingGroup = (props: UseRatingGroupProps): UseRatingGroupReturn => {
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

  const [state, send] = useMachine(rating.machine(context()), { context })

  return createMemo(() => rating.connect(state, send, normalizeProps))
}

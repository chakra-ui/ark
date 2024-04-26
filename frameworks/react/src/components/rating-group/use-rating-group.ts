import * as rating from '@zag-js/rating-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../../providers/environment'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseRatingGroupProps
  extends Optional<Omit<rating.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial value of the rating group.
   */
  defaultValue?: rating.Context['value']
}

export interface UseRatingGroupReturn extends rating.Api<PropTypes> {}

export const useRatingGroup = (props: UseRatingGroupProps): UseRatingGroupReturn => {
  const initialContext: rating.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    value: props.defaultValue,
  }

  const context: rating.Context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
    onHoverChange: useEvent(props.onHoverChange),
  }

  const [state, send] = useMachine(rating.machine(initialContext), {
    context,
  })

  return rating.connect(state, send, normalizeProps)
}

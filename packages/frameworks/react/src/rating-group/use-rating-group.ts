import * as ratingGroup from '@zag-js/rating-group'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'
import { useEvent } from '../use-event'

export interface UseRatingGroupProps extends Optional<ratingGroup.Context, 'id'> {
  /**
   * The initial value of the rating group.
   */
  defaultValue?: ratingGroup.Context['value']
}

export interface UseRatingGroupReturn extends ratingGroup.Api<PropTypes> {}

export const useRatingGroup = (props: UseRatingGroupProps): UseRatingGroupReturn => {
  const initialContext: ratingGroup.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    value: props.defaultValue,
  }

  const context: ratingGroup.Context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
    onHoverChange: useEvent(props.onHoverChange),
  }

  const [state, send] = useMachine(ratingGroup.machine(initialContext), {
    context,
  })

  return ratingGroup.connect(state, send, normalizeProps)
}

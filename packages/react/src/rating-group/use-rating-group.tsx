import * as ratingGroup from '@zag-js/rating-group'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseRatingGroupProps = Optional<ratingGroup.Context, 'id'> & {
  defaultValue?: ratingGroup.Context['value']
}
export type UseRatingGroupReturn = ReturnType<typeof useRatingGroup>

export const useRatingGroup = (props: UseRatingGroupProps) => {
  const getRootNode = useEnvironmentContext()
  const initialContext = {
    id: useId(),
    getRootNode,
    ...props,
    value: props.defaultValue,
  }
  const context = {
    ...initialContext,
    value: props.value,
  }
  const [state, send] = useMachine(ratingGroup.machine(initialContext), {
    context,
  })

  return ratingGroup.connect(state, send, normalizeProps)
}

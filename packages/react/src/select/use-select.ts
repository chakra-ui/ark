import { normalizeProps, useMachine } from '@zag-js/react'
import * as select from '@zag-js/select'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseSelectProps = Optional<select.Context, 'id'> & {
  defaultValue?: select.Context['value']
}
export type UseSelectReturn = select.Api

export const useSelect = (props: UseSelectProps): UseSelectReturn => {
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

  const [state, send] = useMachine(select.machine(initialContext), {
    context,
  })

  return select.connect(state, send, normalizeProps)
}

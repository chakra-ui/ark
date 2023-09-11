import { normalizeProps, useMachine } from '@zag-js/react'
import * as select from '@zag-js/select'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export interface UseSelectProps extends Optional<select.Context, 'id'> {
  defaultValue?: select.Context['selectedOption']
}
export type UseSelectReturn = select.Api

export const useSelect = (props: UseSelectProps): UseSelectReturn => {
  const getRootNode = useEnvironmentContext()
  const initialContext = {
    id: useId(),
    getRootNode,
    ...props,
    selectedOption: props.defaultValue,
  }
  const context = {
    ...initialContext,
    selectedOption: props.selectedOption,
  }

  const [state, send] = useMachine(select.machine(initialContext), {
    context,
  })

  return select.connect(state, send, normalizeProps)
}

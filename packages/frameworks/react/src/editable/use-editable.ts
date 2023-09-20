import * as editable from '@zag-js/editable'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'
import { useEvent } from '../use-event'

export interface UseEditableProps extends Optional<editable.Context, 'id'> {
  defaultValue?: editable.Context['value']
}
export type UseEditableReturn = editable.Api

export const useEditable = (props: UseEditableProps): UseEditableReturn => {
  const getRootNode = useEnvironmentContext()
  const initialContext: editable.Context = {
    id: useId(),
    getRootNode,
    ...props,
    value: props.defaultValue,
  }

  const context: editable.Context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
  }

  const [state, send] = useMachine(editable.machine(initialContext), { context })
  return editable.connect(state, send, normalizeProps)
}

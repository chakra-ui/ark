import { normalizeProps, useMachine } from '@zag-js/react'
import * as toggleGroup from '@zag-js/toggle-group'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseToggleGroupProps = Optional<toggleGroup.Context, 'id'> & {
  defaultValue?: toggleGroup.Context['value']
}
export type UseToggleGroupReturn = toggleGroup.Api

export const useToggleGroup = (props: UseToggleGroupProps): UseToggleGroupReturn => {
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

  const [state, send] = useMachine(toggleGroup.machine(initialContext), {
    context,
  })

  return toggleGroup.connect(state, send, normalizeProps)
}

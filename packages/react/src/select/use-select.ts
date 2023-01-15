import { normalizeProps, useMachine } from '@zag-js/react'
import * as select from '@zag-js/select'
import { useId } from 'react'
import { useEnvironment } from '../environment'
import type { Optional } from '../types'

export type UseSelectProps = Optional<select.Context, 'id'> & {
  defaultValue?: select.Context['selectedOption']
}
export type UseSelectReturn = ReturnType<typeof useSelect>

export const useSelect = (props: UseSelectProps) => {
  const initialContext = useEnvironment({
    id: useId(),
    ...props,
    value: props.defaultValue,
  })
  const context = {
    ...initialContext,
    value: props.selectedOption,
  }

  const [state, send] = useMachine(select.machine(initialContext), {
    context,
  })

  return select.connect(state, send, normalizeProps)
}

import * as editable from '@zag-js/editable'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'

export type UseEditableProps = Omit<editable.Context, 'id'> & {
  defaultValue?: editable.Context['value']
}
export type UseEditableReturn = ReturnType<typeof useEditable>

export const useEditable = (props: UseEditableProps) => {
  const initialContext = {
    id: useId(),
    ...props,
    value: props.value ?? props.defaultValue,
  }

  const context = {
    ...initialContext,
    value: props.value,
  }

  const [state, send] = useMachine(editable.machine(initialContext), { context })

  return editable.connect(state, send, normalizeProps)
}

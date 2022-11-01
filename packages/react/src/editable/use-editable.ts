import * as editable from '@zag-js/editable'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { filterUndefinedEntries } from '../filter-undefined-entries'

export type UseEditableProps = Omit<editable.Context, 'id'> & {
  defaultValue?: editable.Context['value']
}
export type UseEditableReturn = ReturnType<typeof useEditable>

export const useEditable = (props: UseEditableProps) => {
  const initialContext = filterUndefinedEntries({
    id: useId(),
    ...props,
    value: props.value ?? props.defaultValue,
  })

  const context = filterUndefinedEntries({
    ...initialContext,
    value: props.value,
  })

  const [state, send] = useMachine(editable.machine(initialContext), { context })

  return editable.connect(state, send, normalizeProps)
}

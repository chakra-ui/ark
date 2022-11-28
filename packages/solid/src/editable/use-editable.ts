import * as editable from '@zag-js/editable'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'
import type { Optional } from '../types'

export type UseEditableProps = Optional<editable.Context, 'id'> & {
  defaultValue?: editable.Context['value']
}
export type UseEditableReturn = ReturnType<typeof useEditable>

export const useEditable = (props: UseEditableProps) => {
  const initialContext = {
    id: createUniqueId(),
    ...props,
    value: props.defaultValue,
  }

  const context = {
    ...initialContext,
    value: props.value,
  }

  const [state, send] = useMachine(editable.machine(initialContext), { context })
  return createMemo(() => editable.connect(state, send, normalizeProps))
}

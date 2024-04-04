import * as editable from '@zag-js/editable'
import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export interface UseEditableProps extends Optional<editable.Context, 'id'> {}
export interface UseEditableReturn extends Accessor<editable.Api<PropTypes>> {}

export const useEditable = (props: UseEditableProps) => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(editable.machine(context()), { context })

  return createMemo(() => editable.connect(state, send, normalizeProps))
}

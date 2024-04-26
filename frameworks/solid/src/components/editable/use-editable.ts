import * as editable from '@zag-js/editable'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseEditableProps
  extends Optional<Omit<editable.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseEditableReturn extends Accessor<editable.Api<PropTypes>> {}

export const useEditable = (props: UseEditableProps) => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(editable.machine(context), { context })

  return createMemo(() => editable.connect(state, send, normalizeProps))
}

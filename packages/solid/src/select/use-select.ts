import * as select from '@zag-js/select'
import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseSelectProps = Optional<select.Context, 'id'>
export type UseSelectReturn = Accessor<select.Api<PropTypes>>

export const useSelect = (props: UseSelectProps): UseSelectReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(select.machine(context), {
    context,
  })

  return createMemo(() => select.connect(state, send, normalizeProps))
}

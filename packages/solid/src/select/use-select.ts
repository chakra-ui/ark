import * as select from '@zag-js/select'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId, mergeProps } from 'solid-js'
import type { Optional } from '../types'

export type UseSelectProps = Optional<select.Context, 'id'> & {
  defaultValue?: select.Context['selectedOption']
}
export type UseSelectReturn = ReturnType<typeof useSelect>

export const useSelect = (props: UseSelectProps) => {
  const context = mergeProps({ id: createUniqueId() }, props)
  const [state, send] = useMachine(select.machine(context), {
    context,
  })

  return createMemo(() => select.connect(state, send, normalizeProps))
}

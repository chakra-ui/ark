import * as radio from '@zag-js/radio'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId, mergeProps } from 'solid-js'
import type { Optional } from '../types'

export type UseRadioGroupProps = Optional<radio.Context, 'id'>
export type UseRadioGroupReturn = ReturnType<typeof useRadioGroup>

export const useRadioGroup = (props: UseRadioGroupProps) => {
  const context = mergeProps({ id: createUniqueId() }, props)
  const [state, send] = useMachine(radio.machine(context), {
    context,
  })

  return createMemo(() => radio.connect(state, send, normalizeProps))
}

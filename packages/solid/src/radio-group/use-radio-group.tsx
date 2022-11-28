import * as radio from '@zag-js/radio'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'
import type { Optional } from '../types'

export type UseRadioGroupProps = Optional<radio.Context, 'id'> & {
  defaultValue?: radio.Context['value']
}
export type UseRadioGroupReturn = ReturnType<typeof useRadioGroup>

export const useRadioGroup = (props: UseRadioGroupProps) => {
  const initialContext = {
    id: createUniqueId(),
    ...props,
    value: props.defaultValue,
  }

  const context = {
    ...initialContext,
    value: props.value,
  }

  const [state, send] = useMachine(radio.machine(initialContext), {
    context,
  })

  return createMemo(() => radio.connect(state, send, normalizeProps))
}

/** @jsxImportSource solid-js */
import * as pinInput from '@zag-js/pin-input'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'

export type UsePinInputProps = Omit<pinInput.Context, 'id'> & {
  defaultValue?: pinInput.Context['value']
}
export type UsePinInputReturn = ReturnType<typeof usePinInput>

export const usePinInput = (props: UsePinInputProps) => {
  const [state, send] = useMachine(
    pinInput.machine({
      id: createUniqueId(),
      ...props,
      value: props.defaultValue ?? props.value ?? [],
    }),
  )

  return createMemo(() => pinInput.connect(state, send, normalizeProps))
}

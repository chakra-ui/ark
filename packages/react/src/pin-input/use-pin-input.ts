import * as pinInput from '@zag-js/pin-input'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { filterUndefinedEntries } from '../filter-undefined-entries'

export type UsePinInputProps = Omit<pinInput.Context, 'id'> & {
  defaultValue?: pinInput.Context['value']
}

export const usePinInput = (props: UsePinInputProps) => {
  const initialContext = filterUndefinedEntries({
    id: useId(),
    ...props,
    value: props.value ?? props.defaultValue ?? [],
  })

  const context = filterUndefinedEntries({
    ...initialContext,
    value: props.value,
  })

  // TODO https://github.com/chakra-ui/atlas/issues/48
  const [state, send] = useMachine(pinInput.machine(initialContext), { context })

  return pinInput.connect(state, send, normalizeProps)
}

export type UsePinInputReturn = ReturnType<typeof usePinInput>

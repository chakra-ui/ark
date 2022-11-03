import * as pinInput from '@zag-js/pin-input'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { filterUndefinedEntries } from '../filter-undefined-entries'

export type UsePinInputProps = Omit<pinInput.Context, 'id'> & {
  defaultValue?: pinInput.Context['value']
}

// https://zagjs.com/overview/programmatic-control#transient-updates
// do we need to always pass props as context? call stack exceeds
// `This only works for context updates, not internal state updates and is not recommended.`
// how can we ensure that value is not overriden?

// Should the machine ignore undefined values by default?

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

  const [state, send] = useMachine(pinInput.machine(initialContext), { context })

  return pinInput.connect(state, send, normalizeProps)
}

export type UsePinInputReturn = ReturnType<typeof usePinInput>

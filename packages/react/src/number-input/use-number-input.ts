import * as numberInput from '@zag-js/number-input'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { filterUndefinedEntries } from '../filter-undefined-entries'

export type UseNumberInputProps = Omit<numberInput.Context, 'id'> & {
  defaultValue?: numberInput.Context['value']
}

export const useNumberInput = (props: UseNumberInputProps) => {
  const initialContext = filterUndefinedEntries({
    id: useId(),
    ...props,
    value: props.value ?? props.defaultValue,
  })

  const context = filterUndefinedEntries({
    ...initialContext,
    value: props.value,
  })

  const [state, send] = useMachine(numberInput.machine(initialContext), { context })

  return numberInput.connect(state, send, normalizeProps)
}

export type UseNumberInputReturn = ReturnType<typeof useNumberInput>

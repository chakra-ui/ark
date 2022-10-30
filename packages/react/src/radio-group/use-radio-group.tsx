import * as radio from '@zag-js/radio'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { splitProps } from '../split-props'
import { filterUndefinedEntries } from '../filter-undefined-entries'

export type UseRadioGroupProps = Omit<radio.Context, 'id'> & {
  defaultValue?: radio.Context['value']
}
export type UseRadioGroupReturn = ReturnType<typeof useRadioGroup>

export const useRadioGroup = (props: UseRadioGroupProps) => {
  const [{ value, defaultValue }, radioProps, htmlProps] = splitProps(
    props,
    ['value', 'defaultValue'],
    ['dir', 'disabled', 'getRootNode', 'ids', 'name', 'onChange', 'orientation', 'readonly'],
  )

  const initialContext = filterUndefinedEntries({
    id: useId(),
    ...radioProps,
    value: value ?? defaultValue,
  })

  const context = filterUndefinedEntries({
    ...initialContext,
    value,
  })

  const [state, send] = useMachine(radio.machine(initialContext), {
    context,
  })
  const api = radio.connect(state, send, normalizeProps)

  return {
    api,
    htmlProps,
  }
}

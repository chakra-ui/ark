import * as radio from '@zag-js/radio'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'

export type UseRadioGroupProps = Omit<radio.Context, 'id'>
export type UseRadioGroupReturn = ReturnType<typeof useRadioGroup>

export const useRadioGroup = (props: UseRadioGroupProps) => {
  const {
    dir,
    disabled,
    getRootNode,
    ids,
    name,
    onChange,
    orientation,
    readonly,
    value,
    ...htmlProps
  } = props

  const [state, send] = useMachine(
    radio.machine({
      id: useId(),
      dir,
      disabled,
      getRootNode,
      ids,
      name,
      onChange,
      orientation,
      readonly,
      value,
    }),
  )
  const api = radio.connect(state, send, normalizeProps)

  return {
    api,
    htmlProps,
  }
}

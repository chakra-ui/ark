import * as numberInput from '@zag-js/number-input'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseNumberInputProps
  extends Optional<Omit<numberInput.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial value of the number input when it is first rendered.
   * Use when you do not need to control the state of the number input.
   */
  defaultValue?: numberInput.Context['value']
}
export interface UseNumberInputReturn extends numberInput.Api<PropTypes> {}

export const useNumberInput = (props: UseNumberInputProps = {}): UseNumberInputReturn => {
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const initialContext: numberInput.Context = {
    id: useId(),
    dir,
    getRootNode,
    value: props.defaultValue,
    ...props,
  }

  const context: numberInput.Context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
    onValueInvalid: useEvent(props.onValueInvalid),
    onFocusChange: useEvent(props.onFocusChange),
  }

  const [state, send] = useMachine(numberInput.machine(initialContext), { context })
  return numberInput.connect(state, send, normalizeProps)
}

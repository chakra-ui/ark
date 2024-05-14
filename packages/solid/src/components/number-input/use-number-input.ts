import * as numberInput from '@zag-js/number-input'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseNumberInputProps
  extends Optional<Omit<numberInput.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial value of the number input when it is first rendered.
   * Use when you do not need to control the state of the number input.
   */
  defaultValue?: numberInput.Context['value']
}
export interface UseNumberInputReturn extends Accessor<numberInput.Api<PropTypes>> {}

export const useNumberInput = (props: UseNumberInputProps): UseNumberInputReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    value: props.defaultValue,
    ...props,
  }))

  const [state, send] = useMachine(numberInput.machine(context()), { context })

  return createMemo(() => numberInput.connect(state, send, normalizeProps))
}

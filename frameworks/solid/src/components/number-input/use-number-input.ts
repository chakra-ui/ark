import * as numberInput from '@zag-js/number-input'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseNumberInputProps
  extends Optional<Omit<numberInput.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseNumberInputReturn extends Accessor<numberInput.Api<PropTypes>> {}

export const useNumberInput = (props: UseNumberInputProps): UseNumberInputReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...props,
  }))

  const [state, send] = useMachine(numberInput.machine(context()), { context })

  return createMemo(() => numberInput.connect(state, send, normalizeProps))
}

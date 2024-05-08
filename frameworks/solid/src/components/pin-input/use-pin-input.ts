import * as pinInput from '@zag-js/pin-input'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UsePinInputProps
  extends Optional<Omit<pinInput.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UsePinInputReturn extends Accessor<pinInput.Api<PropTypes>> {}

export const usePinInput = (props: UsePinInputProps): UsePinInputReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...props,
  }))
  const [state, send] = useMachine(pinInput.machine(context()), { context })

  return createMemo(() => pinInput.connect(state, send, normalizeProps))
}

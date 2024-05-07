import * as checkbox from '@zag-js/checkbox'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseCheckboxProps
  extends Optional<Omit<checkbox.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseCheckboxReturn extends Accessor<checkbox.Api<PropTypes>> {}

export const useCheckbox = (props: UseCheckboxProps): UseCheckboxReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const context = createMemo(() => ({
    id: createUniqueId(),
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...props,
  }))

  const [state, send] = useMachine(checkbox.machine(context()), { context })

  return createMemo(() => checkbox.connect(state, send, normalizeProps))
}

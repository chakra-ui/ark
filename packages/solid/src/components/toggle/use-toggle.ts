import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as toggle from '@zag-js/toggle'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../../providers/index.tsx'
import type { MaybeAccessor, Optional } from '../../types.ts'
import { runIfFn } from '../../utils/run-if-fn.ts'

export interface UseToggleProps extends Optional<Omit<toggle.Props, 'getRootNode'>, 'id'> {}

export type UseToggleReturn = Accessor<toggle.Api<PropTypes>>

export function useToggle(props?: MaybeAccessor<UseToggleProps>): UseToggleReturn {
  const id = createUniqueId()
  const environment = useEnvironmentContext()

  const machineProps = createMemo<toggle.Props>(() => ({
    id,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(toggle.machine, machineProps)
  return createMemo(() => toggle.connect(service, normalizeProps))
}

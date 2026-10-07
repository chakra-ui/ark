import * as numberFlow from '@zag-js/number-flow'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.tsx'
import type { MaybeAccessor, Optional } from '../../types.ts'
import { runIfFn } from '../../utils/run-if-fn.ts'

export interface UseNumberFlowProps extends Optional<Omit<numberFlow.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseNumberFlowReturn extends Accessor<numberFlow.Api<PropTypes>> {}

export const useNumberFlow = (props?: MaybeAccessor<UseNumberFlowProps>): UseNumberFlowReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const machineProps = createMemo<numberFlow.Props>(() => ({
    id,
    dir: locale().dir,
    locale: locale().locale,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(numberFlow.machine, machineProps)
  return createMemo(() => numberFlow.connect(service, normalizeProps))
}

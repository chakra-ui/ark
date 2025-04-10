import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as toggleGroup from '@zag-js/toggle-group'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'

export interface UseToggleGroupProps extends Optional<Omit<toggleGroup.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseToggleGroupReturn extends Accessor<toggleGroup.Api<PropTypes>> {}

export const useToggleGroup = (props?: MaybeAccessor<UseToggleGroupProps>): UseToggleGroupReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()

  const machineProps = createMemo<toggleGroup.Props>(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(toggleGroup.machine, machineProps)
  return createMemo(() => toggleGroup.connect(service, normalizeProps))
}

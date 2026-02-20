import * as drawer from '@zag-js/drawer'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'
import { useDrawerStackStore } from './use-drawer-stack-store'

export interface UseDrawerProps extends Optional<Omit<drawer.Props, 'dir' | 'getRootNode' | 'defaultSnapPoint'>, 'id'> {
  defaultSnapPoint?: drawer.SnapPoint | undefined
}
export interface UseDrawerReturn extends Accessor<drawer.Api<PropTypes>> {}

export const useDrawer = (props?: MaybeAccessor<UseDrawerProps>): UseDrawerReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()
  const stack = useDrawerStackStore()

  const machineProps = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    stack,
    ...runIfFn(props),
  }))

  const service = useMachine(drawer.machine, machineProps)
  return createMemo(() => drawer.connect(service, normalizeProps))
}

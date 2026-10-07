import * as meter from '@zag-js/meter'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.tsx'
import type { MaybeAccessor, Optional } from '../../types.ts'
import { runIfFn } from '../../utils/run-if-fn.ts'

export interface UseMeterProps extends Optional<Omit<meter.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseMeterReturn extends Accessor<meter.Api<PropTypes>> {}

export const useMeter = (props?: MaybeAccessor<UseMeterProps>): UseMeterReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()

  const machineProps = createMemo<meter.Props>(() => ({
    id,
    dir: locale().dir,
    locale: locale().locale,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(meter.machine, machineProps)
  return createMemo(() => meter.connect(service, normalizeProps))
}

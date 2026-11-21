import * as fieldset from '@zag-js/fieldset'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.tsx'
import type { MaybeAccessor, Optional } from '../../types.ts'
import { runIfFn } from '../../utils/run-if-fn.ts'
import { compact } from '@zag-js/utils'

export interface UseFieldsetProps extends Optional<Omit<fieldset.Props, 'dir' | 'getRootNode'>, 'id'> {}
export type UseFieldsetReturn = Accessor<fieldset.Api<PropTypes>>

export const useFieldset = (props?: MaybeAccessor<UseFieldsetProps>): UseFieldsetReturn => {
  const id = createUniqueId()
  const environment = useEnvironmentContext()
  const locale = useLocaleContext()

  const machineProps = createMemo<fieldset.Props>(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...compact(runIfFn(props) ?? {}),
  }))

  const service = useMachine(fieldset.machine, machineProps)
  return createMemo(() => fieldset.connect(service, normalizeProps))
}

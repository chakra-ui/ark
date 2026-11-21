import * as field from '@zag-js/field'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.tsx'
import type { MaybeAccessor, Optional } from '../../types.ts'
import { runIfFn } from '../../utils/run-if-fn.ts'
import { useFieldsetContext } from '../fieldset/use-fieldset-context.ts'
import { compact } from '@zag-js/utils'

export interface UseFieldProps extends Optional<Omit<field.Props, 'dir' | 'getRootNode'>, 'id'> {}
export type UseFieldReturn = Accessor<field.Api<PropTypes>>

export const useField = (props?: MaybeAccessor<UseFieldProps>): UseFieldReturn => {
  const id = createUniqueId()
  const environment = useEnvironmentContext()
  const locale = useLocaleContext()
  const fieldset = useFieldsetContext()

  const machineProps = createMemo<field.Props>(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    disabled: fieldset?.().disabled,
    ...compact(runIfFn(props) ?? {}),
  }))

  const service = useMachine(field.machine, machineProps)
  return createMemo(() => field.connect(service, normalizeProps))
}

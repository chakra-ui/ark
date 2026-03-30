import * as dateInput from '@zag-js/date-input'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'

export interface UseDateInputProps extends Optional<Omit<dateInput.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseDateInputReturn extends Accessor<dateInput.Api<PropTypes>> {}

export const useDateInput = (props?: MaybeAccessor<UseDateInputProps>): UseDateInputReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()

  const machineProps = createMemo<dateInput.Props>(() => ({
    id,
    dir: locale().dir,
    locale: locale().locale,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(dateInput.machine as any, machineProps)
  return createMemo(() => dateInput.connect(service as any, normalizeProps))
}

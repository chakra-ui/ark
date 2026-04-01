import type { Accessor, Optional } from '$lib/types.js'
import * as dateInput from '@zag-js/date-input'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.js'

export interface UseDateInputProps extends Optional<Omit<dateInput.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseDateInputReturn extends Accessor<dateInput.Api<PropTypes>> {}

export const useDateInput = (props?: MaybeFunction<UseDateInputProps>): UseDateInputReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    return {
      dir: locale().dir,
      locale: locale().locale,
      getRootNode: env().getRootNode,
      ...resolvedProps,
    }
  })

  const service = useMachine(dateInput.machine, () => machineProps)
  const api = $derived(dateInput.connect(service, normalizeProps))

  return () => api
}

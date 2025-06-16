import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import * as pinInput from '@zag-js/pin-input'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UsePinInputProps extends Optional<Omit<pinInput.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UsePinInputReturn extends Accessor<pinInput.Api<PropTypes>> {}

export const usePinInput = (props?: MaybeFunction<UsePinInputProps>): UsePinInputReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ...resolvedProps,
    }
  })

  const service = useMachine(pinInput.machine, () => machineProps)
  $inspect(service.context.get('focusedIndex'))
  const api = $derived(pinInput.connect(service, normalizeProps))
  return () => api
}

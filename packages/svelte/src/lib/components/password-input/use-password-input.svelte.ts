import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import * as passwordInput from '@zag-js/password-input'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UsePasswordInputProps extends Optional<Omit<passwordInput.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UsePasswordInputReturn extends Accessor<passwordInput.Api<PropTypes>> {}

export const usePasswordInput = (props?: MaybeFunction<UsePasswordInputProps>): UsePasswordInputReturn => {
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

  const service = useMachine(passwordInput.machine, () => machineProps)
  const api = $derived(passwordInput.connect(service, normalizeProps))
  return () => api
}

import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import * as dialog from '@zag-js/dialog'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UseDialogProps extends Optional<Omit<dialog.Props, 'getRootNode' | 'dir'>, 'id'> {}

export interface UseDialogReturn extends Accessor<dialog.Api<PropTypes>> {}

export const useDialog = (props?: MaybeFunction<UseDialogProps>): UseDialogReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props) || {}
    return {
      getRootNode: env().getRootNode,
      dir: locale().dir,
      ...resolvedProps,
    }
  })

  const service = useMachine(dialog.machine, () => machineProps)
  const api = $derived(dialog.connect(service, normalizeProps))

  return () => api
}

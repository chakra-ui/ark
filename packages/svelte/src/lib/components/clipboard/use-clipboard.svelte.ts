import { useEnvironmentContext } from '$lib/providers/environment'
import type { Accessor, Optional } from '$lib/types'
import * as clipboard from '@zag-js/clipboard'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UseClipboardProps extends Optional<Omit<clipboard.Props, 'getRootNode'>, 'id'> {}

export interface UseClipboardReturn extends Accessor<clipboard.Api<PropTypes>> {}

export const useClipboard = (props?: MaybeFunction<UseClipboardProps>): UseClipboardReturn => {
  const env = useEnvironmentContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props) || {}
    return {
      getRootNode: env().getRootNode,
      ...resolvedProps,
    }
  })

  const service = useMachine(clipboard.machine, () => machineProps)
  const api = $derived(clipboard.connect(service, normalizeProps))

  return () => api
}

import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor } from '$lib/types'
import * as toc from '@zag-js/toc'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UseTocProps extends Omit<toc.Props, 'dir' | 'getRootNode'> {}
export interface UseTocReturn extends Accessor<toc.Api<PropTypes>> {}

export const useToc = (props: MaybeFunction<UseTocProps>): UseTocReturn => {
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

  const service = useMachine(toc.machine, () => machineProps)
  const api = $derived(toc.connect(service, normalizeProps))
  return () => api
}

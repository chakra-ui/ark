import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import * as splitter from '@zag-js/splitter'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, ensureProps, runIfFn } from '@zag-js/utils'

export interface UseSplitterProps extends Optional<Omit<splitter.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseSplitterReturn extends Accessor<splitter.Api<PropTypes>> {}

export const useSplitter = (props: MaybeFunction<UseSplitterProps>): UseSplitterReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    ensureProps(resolvedProps, ['id'])
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ...resolvedProps,
    }
  })

  const service = useMachine(splitter.machine, () => machineProps)

  const api = $derived(splitter.connect(service, normalizeProps))

  return () => api
}

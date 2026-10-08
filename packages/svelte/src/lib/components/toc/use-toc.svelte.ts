import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import * as toc from '@zag-js/toc'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UseTocProps extends Optional<Omit<toc.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseTocApi extends toc.Api<PropTypes> {
  // TODO: remove once @zag-js/toc ships `getNavProps` (chakra-ui/zag#3403)
  getNavProps(): PropTypes['element']
}
export interface UseTocReturn extends Accessor<UseTocApi> {}

export const useToc = (props?: MaybeFunction<UseTocProps>): UseTocReturn => {
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
  const api = $derived(withNavProps(toc.connect(service, normalizeProps)))
  return () => api
}

// TODO: remove once @zag-js/toc ships `getNavProps` (chakra-ui/zag#3403)
const withNavProps = (api: toc.Api<PropTypes>): UseTocApi => ({
  ...api,
  getRootProps() {
    const { 'aria-labelledby': _, ...rootProps } = api.getRootProps()
    return rootProps
  },
  getNavProps() {
    const { id, dir } = api.getRootProps()
    return {
      'data-scope': 'toc',
      'data-part': 'nav',
      id: `${id}:nav`,
      dir,
      'aria-labelledby': api.getTitleProps().id,
    } as PropTypes['element']
  },
})

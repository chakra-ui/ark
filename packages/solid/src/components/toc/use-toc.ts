import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as toc from '@zag-js/toc'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseTocProps extends Optional<Omit<toc.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseTocApi extends toc.Api<PropTypes> {
  // TODO: remove once @zag-js/toc ships `getNavProps` (chakra-ui/zag#3403)
  getNavProps(): PropTypes['element']
}
export interface UseTocReturn extends Accessor<UseTocApi> {}

export const useToc = (props?: UseTocProps): UseTocReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()

  const machineProps = createMemo<toc.Props>(
    () =>
      ({
        id: props?.id ?? id,
        dir: locale().dir,
        getRootNode: environment().getRootNode,
        items: props?.items ?? [],
        ...props,
      }) as toc.Props,
  )

  const service = useMachine(toc.machine as any, machineProps)
  return createMemo(() => withNavProps(toc.connect(service as any, normalizeProps)))
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

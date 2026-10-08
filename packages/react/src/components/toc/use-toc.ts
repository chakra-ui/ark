import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as toc from '@zag-js/toc'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseTocProps extends Optional<Omit<toc.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseTocReturn extends toc.Api<PropTypes> {
  // TODO: remove once @zag-js/toc ships `getNavProps` (chakra-ui/zag#3403)
  getNavProps(): PropTypes['element']
}

export const useToc = (props?: UseTocProps): UseTocReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const machineProps = {
    id,
    dir,
    getRootNode,
    items: [],
    ...props,
  } as toc.Props

  const service = useMachine(toc.machine as any, machineProps)
  return withNavProps(toc.connect(service as any, normalizeProps))
}

// TODO: remove once @zag-js/toc ships `getNavProps` (chakra-ui/zag#3403)
const withNavProps = (api: toc.Api<PropTypes>): UseTocReturn => ({
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

import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as toc from '@zag-js/toc'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseTocProps extends Optional<Omit<toc.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseTocReturn extends toc.Api<PropTypes> {}

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
  return toc.connect(service as any, normalizeProps)
}

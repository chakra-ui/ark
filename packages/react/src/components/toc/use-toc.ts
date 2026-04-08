import * as toc from '@zag-js/toc'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseTocProps extends Optional<Omit<toc.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseTocReturn extends toc.Api<PropTypes> {}

export const useToc = (props: UseTocProps): UseTocReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const context: toc.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(toc.machine, context)
  return toc.connect(service, normalizeProps)
}

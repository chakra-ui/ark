import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as splitter from '@zag-js/splitter'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseSplitterProps extends Optional<Omit<splitter.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseSplitterReturn extends splitter.Api<PropTypes> {}

export const useSplitter = (props: UseSplitterProps = {}): UseSplitterReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const userProps: splitter.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(splitter.machine, userProps)
  return splitter.connect(service, normalizeProps)
}

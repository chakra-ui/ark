import * as scrollArea from '@zag-js/scroll-area'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseScrollAreaProps extends Optional<Omit<scrollArea.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseScrollAreaReturn extends scrollArea.Api<PropTypes> {}

export const useScrollArea = (props?: UseScrollAreaProps): UseScrollAreaReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const context: scrollArea.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(scrollArea.machine, context)
  return scrollArea.connect(service, normalizeProps)
}

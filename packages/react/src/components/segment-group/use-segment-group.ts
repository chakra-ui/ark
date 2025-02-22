import * as segmentGroup from '@zag-js/radio-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseSegmentGroupProps extends Optional<Omit<segmentGroup.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseSegmentGroupReturn extends segmentGroup.Api<PropTypes> {}

export const useSegmentGroup = (props: UseSegmentGroupProps = {}): UseSegmentGroupReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const userProps: segmentGroup.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(segmentGroup.machine, userProps)
  return segmentGroup.connect(service, normalizeProps)
}

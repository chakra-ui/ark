import * as hoverCard from '@zag-js/hover-card'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseHoverCardProps extends Optional<Omit<hoverCard.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseHoverCardReturn extends hoverCard.Api<PropTypes> {}

export const useHoverCard = (props: UseHoverCardProps = {}): UseHoverCardReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const userProps: hoverCard.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(hoverCard.machine, userProps)
  return hoverCard.connect(service, normalizeProps)
}

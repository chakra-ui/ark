import * as marquee from '@zag-js/marquee'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseMarqueeProps extends Optional<Omit<marquee.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseMarqueeReturn extends marquee.Api<PropTypes> {}

export const useMarquee = (props?: UseMarqueeProps): UseMarqueeReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const context: marquee.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(marquee.machine, context)
  return marquee.connect(service, normalizeProps)
}

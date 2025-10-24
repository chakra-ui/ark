import * as marquee from '@zag-js/marquee'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'

export interface UseMarqueeProps extends Optional<Omit<marquee.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseMarqueeReturn extends Accessor<marquee.Api<PropTypes>> {}

export const useMarquee = (props?: MaybeAccessor<UseMarqueeProps>): UseMarqueeReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const machineProps = createMemo<marquee.Props>(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(marquee.machine, machineProps)
  return createMemo(() => marquee.connect(service, normalizeProps))
}

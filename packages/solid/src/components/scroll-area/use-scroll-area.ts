import * as scrollArea from '@zag-js/scroll-area'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseScrollAreaProps extends Optional<Omit<scrollArea.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseScrollAreaReturn extends Accessor<scrollArea.Api<PropTypes>> {}

export const useScrollArea = (props: UseScrollAreaProps = {}): UseScrollAreaReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()

  const machineProps = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...props,
  }))

  const service = useMachine(scrollArea.machine, machineProps)
  return createMemo(() => scrollArea.connect<PropTypes>(service, normalizeProps))
}

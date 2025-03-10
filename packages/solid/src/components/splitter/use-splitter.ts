import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as splitter from '@zag-js/splitter'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'

export interface UseSplitterProps extends Optional<Omit<splitter.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseSplitterReturn extends Accessor<splitter.Api<PropTypes>> {}

export const useSplitter = (props?: MaybeAccessor<UseSplitterProps>): UseSplitterReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const machineProps = createMemo<splitter.Props>(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(splitter.machine, machineProps)
  return createMemo(() => splitter.connect(service, normalizeProps))
}

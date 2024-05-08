import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as splitter from '@zag-js/splitter'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseSplitterProps
  extends Optional<Omit<splitter.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseSplitterReturn extends Accessor<splitter.Api<PropTypes>> {}

export const useSplitter = (props: UseSplitterProps): UseSplitterReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...props,
  }))
  const [state, send] = useMachine(splitter.machine(context()), { context })

  return createMemo(() => splitter.connect(state, send, normalizeProps))
}

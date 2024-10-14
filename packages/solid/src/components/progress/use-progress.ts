import * as progress from '@zag-js/progress'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseProgressProps
  extends Optional<Omit<progress.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseProgressReturn extends Accessor<progress.Api<PropTypes>> {}

export const useProgress = (props: UseProgressProps = {}): UseProgressReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...props,
  }))
  const [state, send] = useMachine(progress.machine(context()), { context })

  return createMemo(() => progress.connect(state, send, normalizeProps))
}

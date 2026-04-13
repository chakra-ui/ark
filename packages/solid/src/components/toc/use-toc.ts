import * as toc from '@zag-js/toc'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../../providers/environment'
import { useLocaleContext } from '../../providers/locale'
import { runIfFn } from '../../utils/run-if-fn'

export interface UseTocProps extends Omit<toc.Props, 'dir' | 'getRootNode'> {}
export interface UseTocReturn extends Accessor<toc.Api<PropTypes>> {}

export const useToc = (props: UseTocProps) => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()

  const machineProps = createMemo<toc.Props>(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(toc.machine, machineProps)
  return toc.connect(service, normalizeProps)
}

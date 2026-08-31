import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as toc from '@zag-js/toc'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseTocProps extends Optional<Omit<toc.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseTocReturn extends Accessor<toc.Api<PropTypes>> {}

export const useToc = (props?: UseTocProps): UseTocReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()

  const machineProps = createMemo<toc.Props>(
    () =>
      ({
        id: props?.id ?? id,
        dir: locale().dir,
        getRootNode: environment().getRootNode,
        items: props?.items ?? [],
        ...props,
      }) as toc.Props,
  )

  const service = useMachine(toc.machine as any, machineProps)
  return createMemo(() => toc.connect(service as any, normalizeProps))
}

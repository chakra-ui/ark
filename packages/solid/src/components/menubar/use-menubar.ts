import * as menubar from '@zag-js/menubar'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.tsx'
import type { MaybeAccessor, Optional } from '../../types.ts'
import { runIfFn } from '../../utils/run-if-fn.ts'

export interface UseMenubarProps extends Optional<Omit<menubar.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseMenubarReturn extends Accessor<menubar.Api<PropTypes>> {}

export const useMenubar = (props?: MaybeAccessor<UseMenubarProps>): UseMenubarReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const machineProps = createMemo<menubar.Props>(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(menubar.machine, machineProps)
  return createMemo(() => menubar.connect(service, normalizeProps))
}

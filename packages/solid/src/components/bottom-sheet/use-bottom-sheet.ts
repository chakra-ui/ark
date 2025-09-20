import * as bottomSheet from '@zag-js/bottom-sheet'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'

export interface UseBottomSheetProps extends Optional<Omit<bottomSheet.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseBottomSheetReturn extends Accessor<bottomSheet.Api<PropTypes>> {}

export const useBottomSheet = (props?: MaybeAccessor<UseBottomSheetProps>): UseBottomSheetReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const machineProps = createMemo<bottomSheet.Props>(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(bottomSheet.machine, machineProps)
  return createMemo(() => bottomSheet.connect(service, normalizeProps))
}

import * as bottomSheet from '@zag-js/bottom-sheet'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseBottomSheetProps extends Optional<Omit<bottomSheet.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseBottomSheetReturn extends bottomSheet.Api<PropTypes> {}

export const useBottomSheet = (props?: UseBottomSheetProps): UseBottomSheetReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const context: bottomSheet.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(bottomSheet.machine, context)
  return bottomSheet.connect(service, normalizeProps)
}

import * as accordion from '@zag-js/accordion'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId, mergeProps } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseAccordionProps extends Optional<accordion.Context, 'id'> {}
export interface UseAccordionReturn extends Accessor<accordion.Api<PropTypes>> {}

export const useAccordion = (props: UseAccordionProps): UseAccordionReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(accordion.machine(context), { context })

  return createMemo(() => accordion.connect(state, send, normalizeProps))
}

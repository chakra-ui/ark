import * as accordion from '@zag-js/accordion'
import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export interface UseAccordionProps extends Optional<accordion.Context, 'id'> {}
export interface UseAccordionReturn extends Accessor<accordion.Api<PropTypes>> {}

export const useAccordion = (props: UseAccordionProps): UseAccordionReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(accordion.machine(context), { context })

  return createMemo(() => accordion.connect(state, send, normalizeProps))
}

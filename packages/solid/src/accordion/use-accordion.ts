import * as accordion from '@zag-js/accordion'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId, mergeProps } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseAccordionProps = Optional<accordion.Context, 'id'>
export type UseAccordionReturn = ReturnType<typeof useAccordion>

export const useAccordion = (props: UseAccordionProps) => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(accordion.machine(context), { context })

  return createMemo(() => accordion.connect(state, send, normalizeProps))
}

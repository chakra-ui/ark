import * as accordion from '@zag-js/accordion'
import { useMachine, normalizeProps } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'

export type UseAccordionContext = Omit<accordion.Context, 'id'>

export function useAccordion(context: UseAccordionContext) {
  const [state, send] = useMachine(accordion.machine({ id: createUniqueId(), ...context }))
  return createMemo(() => accordion.connect(state, send, normalizeProps))
}

export type UseAccordionReturn = ReturnType<typeof useAccordion>

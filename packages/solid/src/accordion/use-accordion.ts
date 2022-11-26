import * as accordion from '@zag-js/accordion'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'
import type { Optional } from '../types'

export type UseAccordionProps = Optional<accordion.Context, 'id'> & {
  defaultValue?: accordion.Context['value']
}

export type UseAccordionReturn = ReturnType<typeof useAccordion>

export const useAccordion = (props: UseAccordionProps) => {
  const initialContext = {
    id: createUniqueId(),
    ...props,
    value: props.defaultValue,
  }
  const context = {
    ...initialContext,
    value: props.value,
  }
  const [state, send] = useMachine(accordion.machine(initialContext), { context })

  return createMemo(() => accordion.connect(state, send, normalizeProps))
}

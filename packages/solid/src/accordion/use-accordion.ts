import * as accordion from '@zag-js/accordion'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId, mergeProps } from 'solid-js'
import type { Optional } from '../types'

export type UseAccordionProps = Optional<accordion.Context, 'id'> & {
  defaultValue?: accordion.Context['value']
}

export type UseAccordionReturn = ReturnType<typeof useAccordion>

export const useAccordion = (props: UseAccordionProps) => {
  const initialContext = mergeProps({ id: createUniqueId(), value: props.defaultValue }, props)
  const context = mergeProps(initialContext, { value: props.value })

  const [state, send] = useMachine(accordion.machine(initialContext), { context })

  return createMemo(() => accordion.connect(state, send, normalizeProps))
}

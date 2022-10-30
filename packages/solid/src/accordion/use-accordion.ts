/** @jsxImportSource solid-js */
import * as accordion from '@zag-js/accordion'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'

export type UseAccordionProps = Omit<accordion.Context, 'id'> & {
  defaultValue?: accordion.Context['value']
}

export type UseAccordionReturn = ReturnType<typeof useAccordion>

export function useAccordion(props: UseAccordionProps) {
  const [state, send] = useMachine(
    accordion.machine({
      id: createUniqueId(),
      ...props,
      value: props.defaultValue ?? props.value,
    }),
    {
      context: {
        value: props.value,
      },
    },
  )
  return createMemo(() => accordion.connect(state, send, normalizeProps))
}
